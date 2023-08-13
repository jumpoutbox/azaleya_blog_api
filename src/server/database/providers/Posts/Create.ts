import { IPosts } from "../../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../Knex";


export const create = async(posts: Omit<IPosts, 'id'>): Promise<Number | Error> => {

  try {
    const [result] = await Knex(ETableNames.posts).insert(posts).returning('id');
    if(typeof result === 'object'){
        return result.id;
    }else if(typeof result === 'number'){
      return result;
    }
    return new Error('Erro ao cadastrar Postagem') ;
  } catch (error) {
    console.log(error)
    return new Error('Erro ao inserir o registro no bd');
  }
}