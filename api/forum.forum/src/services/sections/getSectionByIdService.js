import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getSectionByIdService = async (sectionId) => {
  const section = await db('sections')
    .leftJoin('pictures', 'sections.picture_id', 'pictures.id_picture')
    .select(
      'sections.id_section',
      'sections.company_id',
      'sections.picture_id',
      'sections.text',
      'pictures.href as picture_href',
      'pictures.alt as picture_alt'
    )
    .where('sections.id_section', sectionId)
    .first();

  if (!section) {
    throw new Error('Section not found');
  }

  return section;
};
