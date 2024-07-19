import knex from "knex";
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getTagsByCompanyIdService = async (companyId) => {
  return db('company_tags')
    .join('tags', 'company_tags.tag_id', '=', 'tags.id_tag')
    .where('company_tags.company_id', companyId)
    .select('tags.*');
}
