import { Images } from "../../../models/Images";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../Knex";
import configMulter from "../../Config/multer";
import multer from "multer";


export const create = async(image: Omit<Images, 'id'>): Promise<Number | Error> => {

  try {
    const uploadImg = multer(configMulter); 
    const [result] = await Knex(ETableNames.images).insert(image).returning('id');
    if(typeof result === 'object'){
        return result.id;
    }else if(typeof result === 'number'){
      return result;
    }
    return new Error('Erro ao cadastrar Author') ;
  } catch (error) {
    console.log(error)
    return new Error('Erro ao inserir o registro no bd');
  }
}