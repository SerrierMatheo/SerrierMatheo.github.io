import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const createSectorService = async (name) => {
  try {
    if (!name) {
      throw new Error('Name is required');
    }

    const [newSectorId] = await db('secteurs_activites').insert({ name });

    const newSector = await db('secteurs_activites')
      .where('id_secteurs_activites', newSectorId)
      .first();

    return newSector;
  } catch (error) {
    throw new Error(`Error creating sector: ${error.message}`);
  }
};
