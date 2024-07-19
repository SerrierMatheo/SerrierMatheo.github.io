import knex from "knex";
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getRdvByUserService = async (userId) => {
  return db('rdvs').where({ user_id: userId }).select();
};
