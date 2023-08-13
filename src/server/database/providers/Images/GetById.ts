import { ETableNames } from "../../ETableNames";
import { ICategory } from "../../../models";
import { Knex } from "../../Knex";

export const getById = async (id: number): Promise<ICategory[] | Error> => {
  try {
    const result = await Knex(ETableNames.category)
      .select('*')
      .where('id', '=', id)
      .first();

      if(result) return result;

      return new Error('Registro não encontrado');
  } catch (error) {
      return new Error('Registro não encontrado');
  }
};