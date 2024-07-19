import knex from "knex";
import knexConfig from '../../configs/db.config.js'

const db = knex(knexConfig);

export const getCompanyByIdService = async (company_id) => {
  const company = await db('companies').where({'id_company': company_id}).first();
  if (company) {
    return company;
  } else {
    throw new Error('Company not found');
  }
};
