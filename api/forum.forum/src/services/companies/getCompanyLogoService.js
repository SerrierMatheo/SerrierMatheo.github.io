import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getCompanyLogoService = async (id_company) => {
  try {
    const company = await db('companies')
      .where('id_company', id_company)
      .select('logo')
      .first();

    if (!company) {
      throw new Error('Company not found');
    }

    return company.logo;
  } catch (error) {
    throw new Error(`Error retrieving company logo: ${error.message}`);
  }
};
