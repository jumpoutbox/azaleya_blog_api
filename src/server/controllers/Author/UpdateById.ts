import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";

interface IBodyProps {
  firstname: String,
  lastname: String,
  email: String,
  userId: number,
}

interface IParamProps {
  id?: number,
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    firstname: yup.string().required().min(6),
    lastname: yup.string().required().min(6),
    email: yup.string().email().required(),
    userId: yup.number().integer().required().moreThan(0),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {

  console.log(req.params);
  console.log(req.body);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Update Not are Implemented ");
}