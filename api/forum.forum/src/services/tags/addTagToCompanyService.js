import knex from "knex";
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const addTagToCompanyService = async (companyId, tagname) => {
  // Vérifier si le tag existe déjà
  const existingTag = await db('tags').where({ tagname }).first();

  if (!existingTag) {
    throw new Error('Tag does not exist');
  }

  const tagId = existingTag.id_tag;
  console.log("id tag",tagId)
  console.log("id company", companyId)

  // Vérifier si le tag est déjà associé à l'entreprise
  const existingCompanyTag = await db('company_tags')
    .where({ tag_id: tagId, company_id: companyId })
    .first();

  if (existingCompanyTag) {
    throw new Error('Tag is already associated with the company');
  }

  // Associer le tag à l'entreprise dans la table 'company_tags'
  await db('company_tags').insert({ tag_id: tagId, company_id: companyId });

  return { id_tag: tagId, tagname };
};
