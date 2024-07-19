import knex from 'knex';
import knexConfig from '../../configs/db.config.js';
import fs from 'fs/promises';
import path from 'path';

const db = knex(knexConfig);

export const updateCompanyBackgroundService = async (id_company, newBackgroundPath) => {
  try {
    // Récupérer l'ancien chemin de l'image
    const company = await db('companies')
      .where('id_company', id_company)
      .select('background')
      .first();

    const oldBackgroundPath = company ? company.background : null;

    // Mettre à jour la base de données avec le nouveau chemin de l'image
    const result = await db('companies')
      .where('id_company', id_company)
      .update({ background: newBackgroundPath });

    if (!result) {
      throw new Error('Failed to update company Background');
    }

    // Supprimer l'ancien fichier d'image s'il existe et est différent du nouveau
    if (oldBackgroundPath && oldBackgroundPath !== newBackgroundPath) {
      const oldFilePath = path.resolve(oldBackgroundPath);
      try {
        await fs.unlink(oldFilePath);
      } catch (unlinkError) {
        console.error(`Failed to delete old picture: ${unlinkError.message}`);
      }
    }

    return { message: 'Company Background updated successfully' };
  } catch (error) {
    throw new Error(`Error updating company Background: ${error.message}`);
  }
};