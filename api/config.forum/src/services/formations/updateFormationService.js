import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const updateFormationService = async (id_formation, updateFields) => {
  try {
    const existingFormation = await db('formations')
      .where({ id_formation })
      .first();

    if (!existingFormation) {
      throw new Error('Formation not found');
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

    await db('formations')
      .where({ id_formation })
      .update(updatedData);

    return db('formations')
      .where({ id_formation })
      .first();
  } catch (error) {
    throw new Error(`Error updating formation: ${error.message}`);
  }
};
