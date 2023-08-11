import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
  .createTable(ETableNames.category, table => {
    table.bigIncrements('id').primary().index();
    table.string('name', 60).checkLength('<=', 60).notNullable().index();
    
  }).then(() => console.log(`# Created Table ${ETableNames.category}`))
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.category)
  .then(() => console.log(`#  Dropped Table ${ETableNames.category}`))
}

