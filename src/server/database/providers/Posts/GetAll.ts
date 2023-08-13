import { ETableNames } from "../../ETableNames";
import { IPosts } from "../../../models";
import { Knex } from "../../Knex";

export const getAll = async(page: number, limit: number, filter: string, id = 0): Promise<IPosts[] | Error> => {
  try {
    
    const result = await Knex(ETableNames.posts)
    .select('*')
    .where('id', Number(id))
    .orWhere('title', 'like', `%${filter}%`)
    .offset((page -1) * limit)
    .limit(limit);

    if(id > 0 && result.every(item => item.id !== id)){
      const resultById = await Knex(ETableNames.posts)
      .select('*')
      .where('id', '=', id)
      .first();

      if(resultById) return [...result, resultById];
    }

    console.log(result);

    return result;

  } catch (error) {
    return new Error('Erro ao encontrar os registros');
  }
};