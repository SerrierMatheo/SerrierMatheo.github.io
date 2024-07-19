import knex from "knex";
import knexConfig from '../configs/db.config.js'

const db = knex(knexConfig);

export const getUserByIdService = async (user_id) => {
  const user = await db('users').where({'id_user': user_id}).first();
  if (user) {
    return user;
  } else {
    throw new Error('User not found');
  }
}