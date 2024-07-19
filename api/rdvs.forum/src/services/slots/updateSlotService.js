import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const updateSlotService = async (slotId, newStart, newDuration) => {
  const existingSlot = await db('slots').where('id_slot', slotId).first();

  if (!existingSlot) {
    throw new Error('Slot not found');
  }

  // Créez un objet pour les champs à mettre à jour
  const updateFields = {};
  if (newStart) {
    updateFields.start = newStart;
  }
  if (newDuration) {
    updateFields.duration = newDuration;
  }

  // Vérifiez s'il existe un créneau avec les nouvelles données
  if (newStart || newDuration) {
    const duplicateSlot = await db('slots')
      .where({
        company_id: existingSlot.company_id,
        start: newStart || existingSlot.start,
        duration: newDuration || existingSlot.duration
      })
      .whereNot({ id_slot: slotId })
      .first();

    if (duplicateSlot) {
      throw new Error('A slot with the same start time and duration already exists for this company');
    }
  }

  await db('slots')
    .where('id_slot', slotId)
    .update(updateFields);

  return db('slots').where('id_slot', slotId).first();
};
