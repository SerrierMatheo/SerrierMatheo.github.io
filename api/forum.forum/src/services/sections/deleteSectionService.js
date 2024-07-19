import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const deleteSectionService = async (sectionId) => {
  const existingSection = await db('sections').where('id_section', sectionId).first();

  if (!existingSection) {
    throw new Error('Section not found');
  }

  await db('sections').where('id_section', sectionId).del();

  return 'Section deleted successfully';
};
