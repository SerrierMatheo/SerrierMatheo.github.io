import knex from "knex";
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const updateTagService = async (tagId, newTagname) => {
  // Vérifier si un nouveau tagname est fourni
  if (!newTagname) {
    throw new Error('No new tagname provided');
  }

  // Mettre à jour le tagname dans la table 'tags'
  await db('tags').where({ id_tag: tagId }).update({ tagname: newTagname });

  return { id_tag: tagId, tagname: newTagname };
};
