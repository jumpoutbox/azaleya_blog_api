import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

interface IUser {
  username: String,
  email: String,
  password: String
}

const bodyValidation: yup.Schema<IUser> = yup.object().shape({
  username: yup.string().required().min(6),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

export const create = async (req: Request<{}, {}, IUser>, res: Response) => {
 let dataValidated: IUser | undefined = undefined;
 try {
   dataValidated = await bodyValidation.validate(req.body, {abortEarly: false})
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach( error => {
      if(error.path === undefined) return;
      errors[error.path] = error.message;
    })

    return res.status(StatusCodes.BAD_REQUEST).json({errors})
  }
  const data : IUser = req.body;
  console.log(data);
  
  return res.send("Created");
}