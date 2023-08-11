import { AuthorProvider } from "../../database/providers/Author";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"
import * as yup from 'yup';

interface IParamProps {
  id?: number,
}


export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
}))
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: { default: 'Problema com a ID, ela deve ser informado antes,'}})
  }

  const result = await AuthorProvider.deleteById(req.params.id);

  if(result instanceof Error){ return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message}})};
  
  
  return res.status(StatusCodes.NO_CONTENT).send();
}