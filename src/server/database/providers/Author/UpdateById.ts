import { ETableNames } from "../../ETableNames";
import { IAuthor } from "../../../models";
import { Knex } from "../../Knex";

export const updateById = async (author: Omit<IAuthor, 'id'>, id:number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.author)
    .update(author)
    .where('id', '=', id)

    if(result > 0) return;
    return new Error('Erro ao actualizar registro')
    
  } catch (error) {
    console.log(error)
    return new Error('Erro ao actualizar registro')
  }
};