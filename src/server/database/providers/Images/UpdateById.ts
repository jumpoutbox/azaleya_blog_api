import { ETableNames } from "../../ETableNames";
import { IAuthor, ICategory } from "../../../models";
import { Knex } from "../../Knex";

export const updateById = async (category: Omit<ICategory, 'id'>, id:number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.category)
    .update(category)
    .where('id', '=', id)

    if(result > 0) return;
    return new Error('Erro ao actualizar registro')
    
  } catch (error) {
    console.log(error)
    return new Error('Erro ao actualizar registro')
  }
};