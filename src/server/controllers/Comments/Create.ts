import { Request,  Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { IComments } from "../../models";
import { CommentsProvider } from "../../database/providers/Comments";


interface IBodyProps extends Omit<IComments, 'id'> {}


export const validationBody = validation((getSchema) => ({
  'body': getSchema<IBodyProps>(yup.object().shape({
        content: yup.string().required().min(3).max(120),
        data: yup.string().required().max(24),
        user: yup.number().integer().required().moreThan(0),
        posts: yup.number().integer().required().moreThan(0),
}))
}));

export const create = async (req: Request<{}, {}, IComments>, res: Response) => {
  const result = await CommentsProvider.create(req.body);
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    })
  }
  return res.status(StatusCodes.CREATED).json(result);
}