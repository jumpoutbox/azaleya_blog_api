import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { Validation } from "../../shared/middleware";

interface IUser {
  username: String,
  email: String,
  password: String
}


export const validationBody = Validation((getSchema) => ({
  'body': getSchema<IUser>(yup.object().shape({
  username: yup.string().required().min(6),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
}))
}));

export const create = async (req: Request<{}, {}, IUser>, res: Response) => {

  const data : IUser = req.body;
  console.log(data);
  return res.send("Created");
}