import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { IPosts } from "../../models";
import { PostsProvider } from "../../database/providers/Posts";


interface IBodyProps extends Omit<IPosts, 'id'> {}

interface IParamProps {
  id?: number,
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    title: yup.string().required().min(3).max(60),
          body: yup.string().required().min(3).max(520),
          data: yup.string().required().max(24),
          author: yup.number().integer().required().moreThan(0),
          category: yup.number().integer().required().moreThan(0),
          like: yup.number().integer().required().moreThan(0),
          images: yup.number().integer().required().moreThan(0),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {

  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: { default: 'O parametro ID precisa ser informado'}});
  }

  const result = await PostsProvider.updateById(req.body, req.params.id);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors: {default: result.message}})
  }

  console.log(req.params);
  console.log(req.body);
  return res.status(StatusCodes.NO_CONTENT).send(result);
}