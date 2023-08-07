import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";

interface IAuthor {
  firstname: String,
  lastname: String,
  email: String,
  userId: number,
}


export const validationBody = validation((getSchema) => ({
  'body': getSchema<IAuthor>(yup.object().shape({
          firstname: yup.string().required().min(6),
          lastname: yup.string().required().min(6),
          email: yup.string().email().required(),
          userId: yup.number().integer().required().moreThan(0),
}))
}));

export const create = async (req: Request<{}, {}, IAuthor>, res: Response) => {

  const data : IAuthor = req.body;
  console.log(data);
  return res.send("Created");
}