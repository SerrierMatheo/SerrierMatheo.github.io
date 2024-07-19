import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const deleteSectorService = async (id_secteurs_activites) => {
  try {
    const existingSector = await db('secteurs_activites')
      .where({ id_secteurs_activites })
      .first();

    if (!existingSector) {
      throw new Error('Sector not found');
    }

    await db('secteurs_activites')
      .where({ id_secteurs_activites })
      .del();

    return { message: 'Sector deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting sector: ${error.message}`);
  }
};
