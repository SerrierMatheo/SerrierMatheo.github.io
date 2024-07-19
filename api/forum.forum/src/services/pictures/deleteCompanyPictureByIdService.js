import knex from 'knex';
import knexConfig from '../../configs/db.config.js';
import fs from 'fs/promises';
import path from 'path';

const db = knex(knexConfig);

export const deleteCompanyPictureByIdService = async (id_company, id_picture) => {
  try {
    // Récupérer le chemin de l'image à supprimer et vérifier qu'elle appartient bien à la compagnie
    const picture = await db('pictures')
      .where({ id_picture, company_id: id_company })
      .select('href')
      .first();

    if (!picture) {
      throw new Error('Picture not found or does not belong to the company');
    }

    const filePath = picture.href;

    // Supprimer l'image de la base de données
    const result = await db('pictures')
      .where({ id_picture, company_id: id_company })
      .del();

    if (!result) {
      throw new Error('Failed to delete picture from database');
    }

    // Supprimer le fichier du serveur
    try {
      await fs.unlink(path.resolve(filePath));
    } catch (unlinkError) {
      console.error(`Failed to delete file from server: ${unlinkError.message}`);
      // Note: Vous pouvez gérer le scénario où le fichier n'existe pas ou ne peut pas être supprimé
    }

    return { message: 'Picture deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting picture: ${error.message}`);
  }
};
