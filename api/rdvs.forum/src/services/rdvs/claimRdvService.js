import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const claimRdvService = async (userId, slotId) => {
  const existingUser = await db('users').where('id_user', userId).first();
  const existingSlot = await db('slots').where('id_slot', slotId).first();

  if (!existingUser) {
    throw new Error('User not found');
  }

  if (!existingSlot) {
    throw new Error('Slot not found');
  }

  // Check if the slot is already claimed
  const existingRdv = await db('rdvs').where('slot_id', slotId).first();
  if (existingRdv) {
    throw new Error('Slot is already claimed');
  }

  const [newRdvId] = await db('rdvs').insert({
    user_id: userId,
    slot_id: slotId
  });

  return db('rdvs').where('id_rdv', newRdvId).first();
};
