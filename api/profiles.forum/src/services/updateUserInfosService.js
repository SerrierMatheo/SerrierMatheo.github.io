import knex from 'knex';
import knexConfig from '../configs/db.config.js';

const db = knex(knexConfig);

export const updateUserInfosService = async (id_user, updateFields) => {
  try {
    // Vérifiez si l'utilisateur existe
    const existingUser = await db('users').where({ id_user }).first();

    if (!existingUser) {
      throw new Error('User does not exist');
    }

    // Construire un objet de mise à jour pour la table `users`
    const userUpdateData = {};
    const userFields = ['phone', 'name', 'firstname', 'mail'];

    for (const key of userFields) {
      if (updateFields[key] !== undefined) {
        userUpdateData[key] = updateFields[key];
      }
    }

    if (Object.keys(userUpdateData).length > 0) {
      await db('users').where({ id_user }).update(userUpdateData);
    }

    // Vérifier si l'utilisateur est de type `intervenant` ou `admin` et mettre à jour `intervenants_users` si nécessaire
    if (existingUser.type === 'intervenant' || existingUser.type === 'admin') {
      const intervenantUpdateData = {};
      const intervenantFields = ['title', 'password'];

      for (const key of intervenantFields) {
        if (updateFields[key] !== undefined) {
          intervenantUpdateData[key] = updateFields[key];
        }
      }

      if (Object.keys(intervenantUpdateData).length > 0) {
        const existingIntervenant = await db('intervenants_users').where({ id_user }).first();

        if (!existingIntervenant) {
          throw new Error('Intervenant does not exist');
        }

        await db('intervenants_users').where({ id_user }).update(intervenantUpdateData);
      }
    }

    return { message: 'User information updated successfully' };
  } catch (error) {
    throw new Error(`Error updating user information: ${error.message}`);
  }
};
