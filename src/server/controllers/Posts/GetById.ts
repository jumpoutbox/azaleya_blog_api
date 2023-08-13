import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { PostsProvider } from "../../database/providers/Posts";


interface IParamProps {
  id: number,
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
}))
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  
  console.log(req.params.id)
  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: { default: 'O parametro ID precisa ser informado'}});
  }

  const result = await PostsProvider.getById(req.params.id);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message }})
  }
  console.log(req.params);
  console.log(result)
  return res.status(StatusCodes.OK).send(result);

}