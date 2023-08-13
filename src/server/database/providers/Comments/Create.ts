import { IComments } from "../../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../Knex";


export const create = async(commentary: Omit<IComments, 'id'>): Promise<Number | Error> => {

  try {
    const [result] = await Knex(ETableNames.comments).insert(commentary).returning('id');
    if(typeof result === 'object'){
        return result.id;
    }else if(typeof result === 'number'){
      return result;
    }
    return new Error('Erro ao cadastrar Comentário') ;
  } catch (error) {
    console.log(error)
    return new Error('Erro ao inserir o comentário no bd');
  }
}