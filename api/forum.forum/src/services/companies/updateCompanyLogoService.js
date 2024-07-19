import knex from 'knex';
import knexConfig from '../../configs/db.config.js';
import fs from 'fs/promises';
import path from 'path';

const db = knex(knexConfig);

export const updateCompanyLogoService = async (id_company, newLogoPath) => {
  try {
    // Récupérer l'ancien chemin de l'image
    const company = await db('companies')
      .where('id_company', id_company)
      .select('logo')
      .first();

    const oldLogoPath = company ? company.logo : null;

    // Mettre à jour la base de données avec le nouveau chemin de l'image
    const result = await db('companies')
      .where('id_company', id_company)
      .update({logo: newLogoPath });

    if (!result) {
      throw new Error('Failed to update company logo');
    }

    // Supprimer l'ancien fichier d'image s'il existe et est différent du nouveau
    if (oldLogoPath && oldLogoPath !== newLogoPath) {
      const oldFilePath = path.resolve(oldLogoPath);
      try {
        await fs.unlink(oldFilePath);
      } catch (unlinkError) {
        console.error(`Failed to delete old picture: ${unlinkError.message}`);
      }
    }

    return { message: 'Company logo updated successfully' };
  } catch (error) {
    throw new Error(`Error updating company logo: ${error.message}`);
  }
};