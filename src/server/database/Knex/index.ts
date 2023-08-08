import knex from "knex";
import { development, test } from "./Enviroment";

const getEnviroments = () => {
    switch (process.env.NODE_ENV) {
        case 'test': return test;
        default: return development;
    }
}
export const Knex = knex(getEnviroments());