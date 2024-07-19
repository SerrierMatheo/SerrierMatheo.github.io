import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const deleteRdvService = async (rdvId) => {
  const existingRdv = await db('rdvs').where('id_rdv', rdvId).first();

  if (!existingRdv) {
    throw new Error('Rendez-vous not found');
  }

  await db('rdvs').where('id_rdv', rdvId).del();

  return { message: 'Rendez-vous deleted successfully' };
};
