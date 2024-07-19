import knex from 'knex'
import knexConfig from '../configs/db.config.js'
import moment from 'moment-timezone'

const db = knex(knexConfig);

export const updateUserService = async (id_user, updates) => {
  try {
    const { username, type, cgu } = updates;

    // Vérifier si l'utilisateur existe
    const existingUser = await db('users').where('id_user', id_user).first();
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Vérifier si le nom d'utilisateur est déjà utilisé par un autre utilisateur
    if (username) {
      const usernameExists = await db('users').where('username', username).andWhere('id_user', '!=', id_user).first();
      if (usernameExists) {
        throw new Error('Username already in use by another user');
      }
    }

    // Mettre à jour les champs spécifiés
    const updatedFields = {};
    if (username) updatedFields.username = username;
    if (type) updatedFields.type = type;
    if (cgu) updatedFields.cgu = cgu;

    await db('logs').insert({
      user_id: id_user,
      action_id: 2,
      api: 'users',
      action: 'updated user',
      timestamp: moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss')
    });

    await db('users').where('id_user', id_user).update(updatedFields);

    // Retourner les informations mises à jour de l'utilisateur
    return await db('users').where('id_user', id_user).first();
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};
