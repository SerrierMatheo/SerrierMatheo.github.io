import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const updateSectorService = async (id_secteurs_activites, updateFields) => {
  try {
    const existingSector = await db('secteurs_activites')
      .where({ id_secteurs_activites })
      .first();

    if (!existingSector) {
      throw new Error('Sector not found');
    }

    // Construire un objet de mise à jour en utilisant uniquement les champs fournis
    const updatedData = {};
    for (const key in updateFields) {
      if (updateFields[key] !== undefined) {
        updatedData[key] = updateFields[key];
      }
    }

    if (Object.keys(updatedData).length === 0) {
      throw new Error('No valid fields provided for update');
    }

    await db('secteurs_activites')
      .where({ id_secteurs_activites })
      .update(updatedData);

    return db('secteurs_activites')
      .where({ id_secteurs_activites })
      .first();
  } catch (error) {
    throw new Error(`Error updating sector: ${error.message}`);
  }
};
