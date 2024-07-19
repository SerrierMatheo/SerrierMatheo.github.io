import knex from 'knex';
import knexConfig from '../configs/db.config.js';

const db = knex(knexConfig);

export const getUserCvService = async (id_user) => {
  try {
    const user = await db('users')
      .where('id_user', id_user)
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    // Récupérer le cv dans la table participants_users
    const participant = await db('participants_users')
      .where('id_user', id_user)
      .first();

    if (!participant) {
      throw new Error('Participant not found');
    }

    // Vérifier si le participant a un CV
    if (!participant.cv_files) {
      return null; // Renvoie null si pas de CV
    }

    return participant.cv_files;
  } catch (error) {
    throw new Error(`Error retrieving user cv: ${error.message}`);
  }
};