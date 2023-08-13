import { ETableNames } from "../../ETableNames";
import { Knex } from "../../Knex";

export const counts = async (filter = ''): Promise<number | Error> => {
  try {
    const [{counts}] = await Knex(ETableNames.posts)
    .where('title', 'like', `%${filter}%`)
    .orWhere('content', 'like', `%${filter}%`)
    .count<[{ counts: number }]>('* as counts');

    if(Number.isInteger(Number(counts))) return Number(counts);

    return new Error('Erro ao consultar mais registros');
  } catch (error) {
    return new Error('Error ao consultar mais registros');
  }
}