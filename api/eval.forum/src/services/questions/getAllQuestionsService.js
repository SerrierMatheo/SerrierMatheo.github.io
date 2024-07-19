import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getAllQuestionsService = async () => {
  return db('questions').select();
};
