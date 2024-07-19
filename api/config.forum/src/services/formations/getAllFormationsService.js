import knex from 'knex'
import knexConfig from '../../configs/db.config.js'

const db = knex(knexConfig);

export const getAllFormationsService = async () => {
  try {
    return await db('formations').select('id_formation', 'nom', 'date_agenda');
  } catch (error) {
    throw new Error(`Error retrieving formations: ${error.message}`);
  }
};
