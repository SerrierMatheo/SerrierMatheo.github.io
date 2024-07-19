import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const createFormationService = async (formationData) => {
  try {
    const { nom, date_agenda } = formationData;

    if (!nom) {
      throw new Error('Nom is required');
    }

    const [newFormationId] = await db('formations').insert({ nom, date_agenda });

    const newFormation = await db('formations')
      .where('id_formation', newFormationId)
      .first();

    return newFormation;
  } catch (error) {
    throw new Error(`Error creating formation: ${error.message}`);
  }
};
