import { ETableNames } from "../../ETableNames";
import { IComments } from "../../../models";
import { Knex } from "../../Knex";

export const updateById = async (commentary: Omit<IComments, 'id'>, id:number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.comments)
    .update(commentary)
    .where('id', '=', id)

    if(result > 0) return;
    return new Error('Erro ao actualizar o comentário')
    
  } catch (error) {
    console.log(error)
    return new Error('Erro ao actualizar o comentário')
  }
};