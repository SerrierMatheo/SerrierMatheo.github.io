import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getCompanyBackgroundService = async (id_company) => {
  try {
    const company = await db('companies')
      .where('id_company', id_company)
      .select('background')
      .first();

    if (!company) {
      throw new Error('Company not found');
    }

    return company.background;
  } catch (error) {
    throw new Error(`Error retrieving company background: ${error.message}`);
  }
}