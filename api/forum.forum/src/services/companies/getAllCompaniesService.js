import knex from "knex";
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getAllCompaniesService = async (keyword, sectorIds, tagIds) => {
  let query = db('companies')
    .select('companies.*', db.raw('GROUP_CONCAT(tags.id_tag) as tags'))
    .leftJoin('company_tags', 'companies.id_company', 'company_tags.company_id')
    .leftJoin('tags', 'company_tags.tag_id', 'tags.id_tag')
    .groupBy('companies.id_company')
    .orderBy('companies.name', 'asc'); // Tri par ordre alphabétique sur le champ 'name'

  if (keyword) {
    query = query.where('companies.name', 'like', `%${keyword}%`);
  }

  if (sectorIds.length) {
    query = query.whereIn('companies.secteur_activite_id', sectorIds);
  }

  if (tagIds.length) {
    query = query.whereIn('tags.id_tag', tagIds);
  }

  return query;
}
