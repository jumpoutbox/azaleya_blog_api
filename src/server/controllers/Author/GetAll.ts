import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { AuthorProvider } from "../../database/providers/Author";

interface IQueryProps {
  id?: number,
  page?: number,
  limit?: number,
  filter?: string
}


export const getAllValidation = validation((getSchema) => ({
  'query': getSchema<IQueryProps>(yup.object().shape({
    id: yup.number().integer().optional().default(0),
    page: yup.number().integer().moreThan(0),
    limit: yup.number().integer().moreThan(0),
    filter: yup.string().optional(),
}))
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  const id = req.query.id;
  const page = req.query.page;
  const limit = req.query.limit;
  const filter = req.query.filter;

  const result = await AuthorProvider.getAll(page || 1, limit || 10, filter || '', id || 0);
  const count = await AuthorProvider.counts(filter);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message}
    })
  }else if(count instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors: { default: count.message}})
  }


  console.log(req.query);
  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);
  return res.status(StatusCodes.OK).send(result);
}