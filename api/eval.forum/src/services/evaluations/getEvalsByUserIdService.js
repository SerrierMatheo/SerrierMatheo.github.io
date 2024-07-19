import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getEvalsByUserIdService = async (userId) => {
  const existingUser = await db('users').where('id_user', userId).first();

  if (!existingUser) {
    throw new Error('User not found');
  }

  return db('evaluations').where('user_id', userId).select();
};
