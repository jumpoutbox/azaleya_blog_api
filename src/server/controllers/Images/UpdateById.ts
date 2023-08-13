import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { ICategory } from "../../models";
import { AuthorProvider } from "../../database/providers/Author";
import { CategoryProvider } from "../../database/providers/Category";

interface IBodyProps extends Omit<ICategory, 'id'> {}

interface IParamProps {
  id?: number,
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3).max(60),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {

  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: { default: 'O parametro ID precisa ser informado'}});
  }

  const result = await CategoryProvider.updateById(req.body, req.params.id);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors: {default: result.message}})
  }

  console.log(req.params);
  console.log(req.body);
  return res.status(StatusCodes.NO_CONTENT).send(result);
}