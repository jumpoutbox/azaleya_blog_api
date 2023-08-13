import { ETableNames } from "../../ETableNames";
import { IAuthor, ICategory } from "../../../models";
import { Knex } from "../../Knex";

export const getAll = async(page: number, limit: number, filter: string, id = 0): Promise<ICategory[] | Error> => {
  try {
    
    const result = await Knex(ETableNames.category)
    .select('*')
    .where('id', Number(id))
    .orWhere('name', 'like', `%${filter}%`)
    .offset((page -1) * limit)
    .limit(limit);

    if(id > 0 && result.every(item => item.id !== id)){
      const resultById = await Knex(ETableNames.category)
      .select('*')
      .where('id', '=', id)
      .first();

      if(resultById) return [...result, resultById];
    }

    return result;

  } catch (error) {
    return new Error('Erro ao encontrar os registros');
  }
};