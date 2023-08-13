import { ETableNames } from '../../ETableNames';
import { Knex } from '../../Knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.posts)
    .where('id', '=', id)
    .del();
    if (result > 0) return;
    return new Error("Post não encontrado");
  } catch (error){
    console.log(error);
    return new Error('Post não encontrado')
  }
}