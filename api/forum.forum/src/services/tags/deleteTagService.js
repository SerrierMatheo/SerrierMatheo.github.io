import knex from "knex";
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const deleteTagService = async (tagId) => {
  return db.transaction(async trx => {
    // Supprimer les occurrences du tag dans la table 'company_tags'
    await trx('company_tags').where({ tag_id: tagId }).del();

    // Supprimer le tag dans la table 'tags'
    await trx('tags').where({ id_tag: tagId }).del();
  });
};
