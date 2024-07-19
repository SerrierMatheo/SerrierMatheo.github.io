import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const deleteSlotService = async (slotId) => {
  const existingSlot = await db('slots').where('id_slot', slotId).first();

  if (!existingSlot) {
    throw new Error('Slot not found');
  }

  await db('slots').where('id_slot', slotId).del();

  return 'Slot deleted successfully';
};

