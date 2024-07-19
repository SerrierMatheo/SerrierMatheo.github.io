import knex from "knex";
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const createTagByCompanyService = async (companyId, tagname) => {
  // Vérifier si le tag existe déjà
  const existingTag = await db('tags').where({ tagname }).first();

  if (existingTag) {
    throw new Error('Tag already exists');
  }

  // Si le tag n'existe pas, insérer le nouveau tag et l'associer à l'entreprise
  return db.transaction(async trx => {
    // Insérer le nouveau tag dans la table 'tags'
    const [newTagId] = await trx('tags').insert({ tagname });

    // Récupérer l'ID du nouveau tag inséré
    const tag = await trx('tags').where({ tagname }).first();
    const tagId = tag.id_tag;

    // Associer le tag à l'entreprise dans la table 'company_tags'
    await trx('company_tags').insert({ tag_id: tagId, company_id: companyId });

    return { id_tag: tagId, tagname };
  });
};
