import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const getEvalByIdService = async (evalId) => {
  const evaluation = await db('evaluations').where('id_eval', evalId).first();

  if (!evaluation) {
    throw new Error('Evaluation not found');
  }

  return evaluation;
};
