import { ETableNames } from "../../ETableNames";
import { IComments } from "../../../models";
import { Knex } from "../../Knex";

export const getById = async (id: number): Promise<IComments[] | Error> => {
  try {
    const result = await Knex(ETableNames.comments)
      .select('*')
      .where('id', '=', id)
      .first();

      if(result) return result;

      return new Error('Registro não encontrado');
  } catch (error) {
      return new Error('Registro não encontrado');
  }
};