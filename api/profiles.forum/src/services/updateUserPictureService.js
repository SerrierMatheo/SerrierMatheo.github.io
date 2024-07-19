import knex from 'knex';
import knexConfig from '../configs/db.config.js';
import fs from 'fs/promises';
import path from 'path';

const db = knex(knexConfig);

export const updateUserPictureService = async (id_user, newPicturePath) => {
  try {
    // Récupérer l'ancien chemin de l'image
    const user = await db('users')
      .where('id_user', id_user)
      .select('picture')
      .first();

    const oldPicturePath = user ? user.picture : null;

    // Mettre à jour la base de données avec le nouveau chemin de l'image
    const result = await db('users')
      .where('id_user', id_user)
      .update({ picture: newPicturePath });

    if (!result) {
      throw new Error('Failed to update user picture');
    }

    // Supprimer l'ancien fichier d'image s'il existe et est différent du nouveau
    if (oldPicturePath && oldPicturePath !== newPicturePath) {
      const oldFilePath = path.resolve(oldPicturePath);
      try {
        await fs.unlink(oldFilePath);
      } catch (unlinkError) {
        console.error(`Failed to delete old picture: ${unlinkError.message}`);
      }
    }

    return { message: 'User picture updated successfully' };
  } catch (error) {
    throw new Error(`Error updating user picture: ${error.message}`);
  }
};
