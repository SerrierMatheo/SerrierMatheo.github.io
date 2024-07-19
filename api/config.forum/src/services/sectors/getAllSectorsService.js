import knex from 'knex'
import knexConfig from '../../configs/db.config.js'

const db = knex(knexConfig);

export const getAllSectorsService = async () => {
  try {
    return await db('secteurs_activites').select('id_secteurs_activites', 'name');
  } catch (error) {
    throw new Error(`Error retrieving sectors: ${error.message}`);
  }
};
