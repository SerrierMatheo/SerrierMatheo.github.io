import knex from "knex";
import knexConfig from '../configs/db.config.js'

const db = knex(knexConfig);

export const getAllUsersService = async (keyword) => {
  let query = db('users')
    .select()
    .orderBy('name', 'asc'); // Tri par ordre alphabétique sur le champ 'name'

  if (keyword) {
    query = query.where('name', 'like', `%${keyword}%`)
      .orWhere('firstname', 'like', `%${keyword}%`)
      .orWhere('username', 'like', `%${keyword}%`);
  }

  return query;
};
