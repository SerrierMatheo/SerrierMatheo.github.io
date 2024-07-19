import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const updateSectionService = async (sectionId, newText, newPictureId) => {
  const existingSection = await db('sections').where('id_section', sectionId).first();

  if (!existingSection) {
    throw new Error('Section not found');
  }

  const updateData = {};

  if (newText !== undefined) {
    updateData.text = newText;
  }

  if (newPictureId !== undefined) {
    const existingPicture = await db('pictures').where('id_picture', newPictureId).first();
    if (!existingPicture) {
      throw new Error('Picture not found');
    }
    updateData.picture_id = newPictureId;
  }

  await db('sections').where('id_section', sectionId).update(updateData);

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
    .where('sections.id_section', sectionId)
    .first();
};
