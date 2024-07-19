import knex from "knex";
import knexConfig from '../configs/db.config.js';

const db = knex(knexConfig);

export const getIntervenantsNbService = async () => {
  try {
    return await db('intervenants_users').count('* as nb_intervenants');
  } catch (error) {
    throw new Error(`Error counting intervenants: ${error.message}`);
  }
};
