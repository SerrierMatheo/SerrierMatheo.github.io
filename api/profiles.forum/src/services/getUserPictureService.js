import knex from 'knex';
import knexConfig from '../configs/db.config.js';

const db = knex(knexConfig);

export const getUserPictureService = async (id_user) => {
  try {
    const user = await db('users')
      .where('id_user', id_user)
      .select('picture')
      .first();

    if (!user) {
      throw new Error('User not found');
    }
    if (user.picture === null) {
      return "uploads/pictures/gray_avatar.jpg";
    }

    return user.picture;
  } catch (error) {
    throw new Error(`Error retrieving user picture: ${error.message}`);
  }
};
