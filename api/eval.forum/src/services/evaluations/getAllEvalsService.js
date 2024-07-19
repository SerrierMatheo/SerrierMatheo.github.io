import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getAllEvalsService = async () => {
  return db('evaluations').select();
};
