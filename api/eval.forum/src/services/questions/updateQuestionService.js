import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const updateQuestionService = async (questionId, newQuestion) => {
  const existingQuestion = await db('questions').where('id_questions', questionId).first();

  if (!existingQuestion) {
    throw new Error('Question not found');
  }

  await db('questions').where('id_questions', questionId).update({ question: newQuestion });

  return db('questions').where('id_questions', questionId).first();
};
