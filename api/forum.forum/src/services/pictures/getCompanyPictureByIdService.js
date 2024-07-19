import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getCompanyPictureByIdService = async (id_company, id_picture) => {
  try {
    // Récupérer une image associées à la compagnie
    const picture = await db('pictures')
    .where({
        company_id: id_company,
        id_picture: id_picture
      })
      .select('href')
      .first(); // Retourne le premier (et unique) résultat

    if (!picture) {
      throw new Error('No pictures found for the specified company and picture_id');
    }

    return picture.href;
  } catch (error) {
    throw new Error(`Error retrieving company picture by id: ${error.message}`);
  }
};
