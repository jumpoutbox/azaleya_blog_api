import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { IAuthor } from "../../models";
import { AuthorProvider } from "../../database/providers/Author";

interface IBodyProps extends Omit<IAuthor, 'id'> {}


export const validationBody = validation((getSchema) => ({
  'body': getSchema<IBodyProps>(yup.object().shape({
          name: yup.string().required().min(3).max(60),
          surname: yup.string().required().min(3).max(60),
          email: yup.string().email().required(),
          userId: yup.number().integer().required().moreThan(0),
}))
}));

export const create = async (req: Request<{}, {}, IAuthor>, res: Response) => {
  const result = await AuthorProvider.create(req.body);
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    })
  }
  return res.status(StatusCodes.CREATED).json(result);
}