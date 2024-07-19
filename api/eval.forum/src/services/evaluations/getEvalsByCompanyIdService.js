import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getEvalsByCompanyIdService = async (companyId) => {
  const existingCompany = await db('companies').where('id_company', companyId).first();

  if (!existingCompany) {
    throw new Error('Company not found');
  }

  return db('evaluations').where('company_id', companyId).select();
};
