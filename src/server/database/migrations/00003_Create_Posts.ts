import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
  .createTable(ETableNames.posts, table => {
    table.bigIncrements('id').primary().index();
    table.string('title', 60).unique().checkLength('<=', 60).notNullable().index();
    table.string('body').checkLength("<=", 520).notNullable().index();
    table.dateTime('data').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable().index();

    table.comment('As tabelas abaixo possuem relacionamento')
    
    table.bigInteger('author')
    .index()
    .notNullable()
    .references('id')
    .inTable(ETableNames.author)
    .onUpdate('CASCADE')
    .onDelete("RESTRICT");

    table.bigInteger('category')
    .index()
    .notNullable()
    .references('id')
    .inTable(ETableNames.category)
    .onUpdate('CASCADE')
    .onDelete("RESTRICT");
    
    table.integer('images').nullable();
    // userId: number,
  }).then(() => console.log(`# Created Table ${ETableNames.posts}`))
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.posts)
  .then(() => console.log(`#  Dropped Table ${ETableNames.posts}`))
}

