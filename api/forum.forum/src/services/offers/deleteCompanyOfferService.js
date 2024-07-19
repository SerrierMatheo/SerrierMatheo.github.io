import knex from 'knex';
import knexConfig from '../../configs/db.config.js';
import fs from 'fs/promises';
import path from 'path';

const db = knex(knexConfig);

export const deleteCompanyOfferService = async (id_company, id_offer) => {
  try {
    // Récupérer le chemin de l'offre à supprimer et vérifier qu'elle appartient bien à la compagnie
    const offer = await db('offers')
      .where({ id_offer, company_id: id_company })
      .select('file')
      .first();

    if (!offer) {
      throw new Error('Offer not found or does not belong to the company');
    }

    const filePath = offer.file;

    // Supprimer l'offre de la base de données
    const result = await db('offers')
      .where({ id_offer, company_id: id_company })
      .del();

    if (!result) {
      throw new Error('Failed to delete offer from database');
    }

    // Supprimer le fichier du serveur
    try {
      await fs.unlink(path.resolve(filePath));
    } catch (unlinkError) {
      console.error(`Failed to delete file from server: ${unlinkError.message}`);
      // Note: Vous pouvez gérer le scénario où le fichier n'existe pas ou ne peut pas être supprimé
    }

    return { message: 'Offer deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting offer: ${error.message}`);
  }
};
