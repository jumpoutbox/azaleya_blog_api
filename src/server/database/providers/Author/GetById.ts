import { ETableNames } from "../../ETableNames";
import { IAuthor } from "../../../models";
import { Knex } from "../../Knex";

export const getById = async (id: number): Promise<IAuthor[] | Error> => {
  try {
    const result = await Knex(ETableNames.author)
      .select('*')
      .where('id', '=', id)
      .first();

      if(result) return result;

      return new Error('Registro não encontrado');
  } catch (error) {
      return new Error('Registro não encontrado');
  }
};