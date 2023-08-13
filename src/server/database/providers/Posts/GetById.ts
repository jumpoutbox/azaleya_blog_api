import { ETableNames } from "../../ETableNames";
import { IPosts } from "../../../models";
import { Knex } from "../../Knex";

export const getById = async (id: number): Promise<IPosts[] | Error> => {
  try {
    const result = await Knex(ETableNames.posts)
      .select('*')
      .where('id', '=', id)
      .first();

      if(result) return result;

      return new Error('Registro não encontrado');
  } catch (error) {
      return new Error('Registro não encontrado');
  }
};