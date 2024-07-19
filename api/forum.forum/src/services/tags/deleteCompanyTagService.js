import knex from "knex";
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const deleteCompanyTagService = async (companyId, tagId) => {
  // Vérifier si l'entreprise existe
  const company = await db('companies').where({ id_company: companyId }).first();
  if (!company) {
    throw new Error('Company not found');
  }

  // Vérifier si le tag existe
  const tag = await db('tags').where({ id_tag: tagId }).first();
  if (!tag) {
    throw new Error('Tag not found');
  }

  // Supprimer l'association du tag avec l'entreprise dans la table 'company_tags'
  await db('company_tags')
    .where({ company_id: companyId, tag_id: tagId })
    .del();
};
