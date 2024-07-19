import knex from "knex";
import knexConfig from '../configs/db.config.js';

const db = knex(knexConfig);

export const getCompaniesNbService = async () => {
  try {
    return await db('companies').count('* as nb_companies');
  } catch (error) {
    throw new Error(`Error counting companies: ${error.message}`);
  }
};
