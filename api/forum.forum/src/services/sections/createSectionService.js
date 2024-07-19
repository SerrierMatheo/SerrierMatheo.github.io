import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const createSectionService = async (companyId, pictureId, text) => {
  const existingCompany = await db('companies').where('id_company', companyId).first();

  if (!existingCompany) {
    throw new Error('Company not found');
  }

  const existingPicture = await db('pictures').where('id_picture', pictureId).first();

  if (!existingPicture) {
    throw new Error('Picture not found');
  }

  const newSectionData = {
    company_id: companyId,
    text,
    picture_id: pictureId
  };

  const [newSectionId] = await db('sections').insert(newSectionData);

  return db('sections').where('id_section', newSectionId).first();
};
