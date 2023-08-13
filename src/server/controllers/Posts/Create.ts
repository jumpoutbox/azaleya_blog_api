import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { IPosts } from "../../models";
import { PostsProvider } from "../../database/providers/Posts";


interface IBodyProps extends Omit<IPosts, 'id'> {}


export const validationBody = validation((getSchema) => ({
  'body': getSchema<IBodyProps>(yup.object().shape({
          title: yup.string().required().min(3).max(60),
          body: yup.string().required().min(3).max(520),
          data: yup.string().required().max(24),
          author: yup.number().integer().required().moreThan(0),
          category: yup.number().integer().required().moreThan(0),
          images: yup.number().integer().required().moreThan(0),
}))
}));

export const create = async (req: Request<{}, {}, IPosts>, res: Response) => {
  const result = await PostsProvider.create(req.body);
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    })
  }
  return res.status(StatusCodes.CREATED).json(result);
}