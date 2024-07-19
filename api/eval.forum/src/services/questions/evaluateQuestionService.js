import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const evaluateQuestionService = async (evalId, questionId, grade) => {
  const existingEval = await db('evaluations').where('id_eval', evalId).first();
  const existingQuestion = await db('questions').where('id_questions', questionId).first();

  if (!existingEval) {
    throw new Error('Evaluation not found');
  }

  if (!existingQuestion) {
    throw new Error('Question not found');
  }

  const validGrades = ['insuffisant', 'passable', 'bien', 'très bien'];
  if (!validGrades.includes(grade)) {
    throw new Error('Invalid grade value');
  }

  const existingQuestionEval = await db('questions_evaluations')
    .where('eval_id', evalId)
    .andWhere('question_id', questionId)
    .first();

  if (existingQuestionEval) {
    await db('questions_evaluations')
      .where('id_question_eval', existingQuestionEval.id_question_eval)
      .update({ grade });
  } else {
    await db('questions_evaluations').insert({
      eval_id: evalId,
      question_id: questionId,
      grade
    });
  }

  return db('questions_evaluations')
    .where('eval_id', evalId)
    .andWhere('question_id', questionId)
    .first();
};
