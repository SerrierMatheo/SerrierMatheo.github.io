import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const createCompanyService = async (company_name, secteur_activite_id) => {
  try {
    const existingCompany = await db('companies').where('name', company_name).first();

    if (existingCompany) {
      throw new Error('Company with this name already exists');
    }

    const [insertedCompanyId] = await db('companies').insert({
      name: company_name,
      secteur_activite_id
    });

    return db('companies').where('id_company', insertedCompanyId).first();
  } catch (error) {
    throw new Error('Error creating company: ' + error.message);
  }
};
