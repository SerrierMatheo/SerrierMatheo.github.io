import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getCompanyPicturesService = async (id_company) => {
  try {
    // Récupérer toutes les images associées à la compagnie
    const pictures = await db('pictures')
      .where('company_id', id_company)
      .select('id_picture', 'href', 'alt', 'company_id');

    if (!pictures.length) {
      throw new Error('No pictures found for the specified company');
    }

    return pictures;
  } catch (error) {
    throw new Error(`Error retrieving company pictures: ${error.message}`);
  }
};
