import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const updateEvalService = async (evalId, updatedFields) => {
  const existingEval = await db('evaluations').where('id_eval', evalId).first();

  if (!existingEval) {
    throw new Error('Evaluation not found');
  }

  await db('evaluations').where('id_eval', evalId).update(updatedFields);

  return db('evaluations').where('id_eval', evalId).first();
};
