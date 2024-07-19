import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const updateCompanyService = async (id_company, updateFields) => {
  try {
    const existingCompany = await db('companies').where({'id_company': id_company}).first();

    if (!existingCompany) {
      throw new Error('Company does not exist');
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

    await db('companies').where({ 'id_company': id_company }).update(updatedData);
    return db('companies').where({ 'id_company': id_company }).first();
  } catch (error) {
    throw new Error(`Error updating company: ${error.message}`);
  }
};
