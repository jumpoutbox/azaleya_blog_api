import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
  .createTable(ETableNames.comments, table => {
    table.bigIncrements('id').primary().index();
    table.string('content', 120).checkLength('<=', 120).notNullable().index();
    table.dateTime('data').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable().index();
    table.integer('user').notNullable().index();
    
    table.bigInteger('posts')
    .index()
    .nullable()
    .references('id')
    .inTable(ETableNames.posts)
    .onUpdate('CASCADE')
    .onDelete("RESTRICT");
    
  }).then(() => console.log(`# Created Table ${ETableNames.comments}`))
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.comments)
  .then(() => console.log(`#  Dropped Table ${ETableNames.comments}`))
}

