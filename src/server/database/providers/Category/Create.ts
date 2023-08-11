import { IAuthor, ICategory } from "../../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../Knex";


export const create = async(category: Omit<ICategory, 'id'>): Promise<Number | Error> => {

  try {
    const [result] = await Knex(ETableNames.category).insert(category).returning('id');
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