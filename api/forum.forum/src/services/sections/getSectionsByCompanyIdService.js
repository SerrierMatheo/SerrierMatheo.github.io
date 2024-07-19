import knex from 'knex'
import knexConfig from '../../configs/db.config.js'

const db = knex(knexConfig);

export const getSectionsByCompanyIdService = async (companyId) => {
  const existingCompany = await db('companies').where('id_company', companyId).first();

  if (!existingCompany) {
    throw new Error('Company not found');
  }

  return db('sections')
    .leftJoin('pictures', 'sections.picture_id', 'pictures.id_picture')
    .select(
      'sections.id_section',
      'sections.company_id',
      'sections.picture_id',
      'sections.text',
      'pictures.href as picture_href',
      'pictures.alt as picture_alt'
    )
    .where('sections.company_id', companyId)
};
