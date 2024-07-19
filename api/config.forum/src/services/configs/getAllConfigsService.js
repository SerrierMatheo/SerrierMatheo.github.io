import knex from 'knex'
import knexConfig from '../../configs/db.config.js'

const db = knex(knexConfig);

export const getAllConfigsService = async () => {
  try {
    return await db('configs').select();
  } catch (error) {
    throw new Error(`Error retrieving configs: ${error.message}`);
  }
};
