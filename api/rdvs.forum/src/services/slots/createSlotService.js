import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const createSlotService = async (company_id, start, duration) => {
  try {
    const existingCompany = await db('companies').where('id_company', company_id).first();

    if (!existingCompany) {
      throw new Error('Company does not exist');
    } else if (!start) {
      throw new Error('No start time selected');
    } else if (!duration) {
      throw new Error('No duration selected');
    }

    // Vérifier si un créneau avec les mêmes données existe déjà
    const existingSlot = await db('slots')
      .where({
        company_id: company_id,
        start: start,
        duration: duration
      })
      .first();

    if (existingSlot) {
      throw new Error('Slot with the same company, start time and duration already exists');
    }

    // Insérer le nouveau créneau
    const [insertedSlotId] = await db('slots').insert({ company_id: company_id, start: start, duration: duration });
    return db('slots').where('id_slot', insertedSlotId).first();
  } catch (error) {
    throw new Error(error.message || 'Error creating slot');
  }
};
