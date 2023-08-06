import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from 'yup';

type TProperty = 'header' | 'body' | 'params' | 'query';

type TGetSchemas = <T>(schema: Schema<T>) => Schema<T>;

type TALLSchemas = Record<TProperty, Schema<any>>;

type TGetAllSchema = (getSchema: TGetSchemas) => Partial<TALLSchemas>

type TValidation = (getAllSchemas: TGetAllSchema) => RequestHandler;



export const Validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas(schemas => schemas)

  const errorsResults: Record<string|TProperty, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false })
      return next();
    } catch (error) {
      const yupError = error as ValidationError;
      const errors: Record<string, string> = {};

      yupError.inner.forEach(error => {
        if (error.path === undefined) return;
        errors[error.path] = error.message;
      })
      errorsResults[key as TProperty] = errors;
    }
  })

  if(Object.entries(errorsResults).length === 0){ return next()}else{return res.status(StatusCodes.BAD_REQUEST).json({ errorsResults })}

};