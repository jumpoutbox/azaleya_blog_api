import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { ICategory } from "../../models";
import { CategoryProvider } from "../../database/providers/Category";

interface IBodyProps extends Omit<ICategory, 'id'> {}


export const validationBody = validation((getSchema) => ({
  'body': getSchema<IBodyProps>(yup.object().shape({
          name: yup.string().required().min(3).max(60),
}))
}));

export const create = async (req: Request<{}, {}, ICategory>, res: Response) => {
  const result = await CategoryProvider.create(req.body);
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
     errors: { default: result.message }
    })
  }
  return res.status(StatusCodes.CREATED).json(result);
}