import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
  .createTable(ETableNames.author, table => {
    table.bigIncrements('id').primary().index();
    table.string('name', 60).notNullable().index();
    table.string('surname', 60).notNullable().index();
    table.string('email', 130).notNullable().index();
      
    table.comment('Aqui tera uma relacao com o usuario')
    // userId: number,
  }).then(() => console.log(`# Created Table ${ETableNames.author}`))
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.author)
  .then(() => console.log(`#  Dropped Table ${ETableNames.author}`))
}

