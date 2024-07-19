import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getCompanyIntervenantService = async (id_company) => {
  try {
    const intervenants = await db('users as u')
      .join('intervenants_users as iu', 'u.id_user', 'iu.id_user')
      .select('u.id_user', 'u.picture', 'u.name', 'u.firstname', 'iu.title')
      .where({
        'u.type': 'intervenant',
        'iu.company_id': id_company
      });

    if (intervenants.length === 0) {
      throw new Error('Intervenants not found');
    }

    return intervenants;
  } catch (error) {
    throw new Error(`Error retrieving company intervenant: ${error.message}`);
  }
};
