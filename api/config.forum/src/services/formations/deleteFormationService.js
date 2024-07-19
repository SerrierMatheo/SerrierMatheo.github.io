import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const deleteFormationService = async (id_formation) => {
  try {
    const existingFormation = await db('formations')
      .where({ id_formation })
      .first();

    if (!existingFormation) {
      throw new Error('Formation not found');
    }

    await db('formations')
      .where({ id_formation })
      .del();

    return { message: 'Formation deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting formation: ${error.message}`);
  }
};
