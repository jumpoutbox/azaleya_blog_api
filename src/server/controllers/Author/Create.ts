import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";

interface IAuthor {
  name: String,
  surname: String,
  email: String,
  userId: number,
}


export const validationBody = validation((getSchema) => ({
  'body': getSchema<IAuthor>(yup.object().shape({
          name: yup.string().required().min(6),
          surname: yup.string().required().min(6),
          email: yup.string().email().required(),
          userId: yup.number().integer().required().moreThan(0),
}))
}));

export const create = async (req: Request<{}, {}, IAuthor>, res: Response) => {

  const data : IAuthor = req.body;
  console.log(data);
  return res.status(StatusCodes.CREATED).json(1);
}