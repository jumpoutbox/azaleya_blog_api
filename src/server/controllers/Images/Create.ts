import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { CategoryProvider } from "../../database/providers/Category";
import { Images } from "../../models/Images";

interface IBodyProps extends Omit<Images, 'id'> {}


export const validationBody = validation((getSchema) => ({
  'body': getSchema<IBodyProps>(yup.object().shape({
          name: yup.string().required(),
          path: yup.string().required(),
}))
}));

export const create = async (req: Request<{}, {}, Images>, res: Response) => {
  const imgfile = req.files as Express.Multer.File[]; 
  const imgUpload = imgfile.map((image) => {
    return { path: image.filename, }
  })
  const result = await CategoryProvider.create(req.body);
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
     errors: { default: result.message }
    })
  }
  return res.status(StatusCodes.CREATED).json(result);
}