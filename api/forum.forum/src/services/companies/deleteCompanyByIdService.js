import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const deleteCompanyByIdService = async (id_company) => {
  const trx = await db.transaction();

  try {
    // Suppression des enregistrements associés dans les tables dépendantes
    await trx('sections').whereIn('picture_id', function() {
      this.select('id_picture').from('pictures').where('company_id', id_company);
    }).del();

    await trx('pictures').where('company_id', id_company).del();

    // Suppression des rendez-vous avant les slots
    await trx('rdvs').whereIn('slot_id', function() {
      this.select('id_slot').from('slots').where('company_id', id_company);
    }).del();

    await trx('slots').where('company_id', id_company).del();

    // Suppression des questions des évaluations avant les évaluations
    await trx('questions_evaluations').whereIn('eval_id', function() {
      this.select('id_eval').from('evaluations').where('company_id', id_company);
    }).del();

    await trx('evaluations').where('company_id', id_company).del();
    await trx('offers').where('company_id', id_company).del();
    await trx('company_tags').where('company_id', id_company).del();
    await trx('intervenants_users').where('company_id', id_company).del();

    // Suppression de la company
    const result = await trx('companies').where('id_company', id_company).del();

    await trx.commit();
    return result;
  } catch (error) {
    await trx.rollback();
    throw new Error('Error deleting company and associated records: ' + error.message);
  }
};
