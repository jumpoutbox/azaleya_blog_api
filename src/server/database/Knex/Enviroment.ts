import { Knex } from 'knex';
import path from 'path';

export const developmentOne: Knex.Config = {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
    host : '172.17.0.2',
    port : 3306,
    user : process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD || 'myDb88_',
    database : process.env.DB_NAME || 'db_gymapp',
    },
      migrations: {
      directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, '..', 'seeds'),
    }
  };

export const development: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run('PRAGMA foreign_keys = ON');
      done();
    }
  }
};

export const test: Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
  connection:':memory',

migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
},
seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
},
pool: {
    afterCreate: (connection: any, done: Function) => {
        connection.run('PRAGMA foreign_key = ON');
        done();
    },
}
};


export const production = {};