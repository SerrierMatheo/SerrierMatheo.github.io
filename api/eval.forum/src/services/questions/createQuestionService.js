import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const createQuestionService = async (question) => {
  const [newQuestionId] = await db('questions').insert({ question });

  return db('questions').where('id_questions', newQuestionId).first();
};
