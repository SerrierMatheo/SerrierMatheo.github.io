import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getCompanyOffersService = async (id_company) => {
  try {
    // Récupérer toutes les offres associées à la compagnie
    const offers = await db('offers')
      .where('company_id', id_company)
      .select('id_offer', 'file', 'title', 'type');

    if (!offers.length) {
      throw new Error('No offers found for the specified company');
    }

    return offers;
  } catch (error) {
    throw new Error(`Error retrieving company offers: ${error.message}`);
  }
};
