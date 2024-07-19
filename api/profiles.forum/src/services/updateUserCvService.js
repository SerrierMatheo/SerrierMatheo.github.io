import knex from 'knex';
import knexConfig from '../configs/db.config.js';
import fs from 'fs/promises';
import path from 'path';

const db = knex(knexConfig);

export const updateUserCvService = async (id_user, newCvPath) => {
  try {
    // Récupérer l'ancien chemin du CV
    const participant = await db('participants_users')
      .where('id_user', id_user)
      .select('cv_files')
      .first();

    const oldCvPath = participant ? participant.cv_files : null;

    // Mettre à jour la base de données avec le nouveau chemin du CV
    const result = await db('participants_users')
      .where('id_user', id_user)
      .update({ cv_files: newCvPath });

    if (!result) {
      throw new Error('Failed to update user CV');
    }

    // Supprimer l'ancien fichier CV s'il existe et est différent du nouveau
    if (oldCvPath && oldCvPath !== newCvPath) {
      const oldFilePath = path.resolve(oldCvPath);
      try {
        await fs.unlink(oldFilePath);
      } catch (unlinkError) {
        console.error(`Failed to delete old CV: ${unlinkError.message}`);
      }
    }

    return { message: 'User CV updated successfully' };
  } catch (error) {
    throw new Error(`Error updating user CV: ${error.message}`);
  }
};
