import { ETableNames } from "../../ETableNames";
import { IPosts } from "../../../models";
import { Knex } from "../../Knex";

export const updateById = async (posts: Omit<IPosts, 'id'>, id:number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.posts)
    .update(posts)
    .where('id', '=', id)

    if(result > 0) return;
    return new Error('Erro ao actualizar registro')
    
  } catch (error) {
    console.log(error)
    return new Error('Erro ao actualizar registro')
  }
};