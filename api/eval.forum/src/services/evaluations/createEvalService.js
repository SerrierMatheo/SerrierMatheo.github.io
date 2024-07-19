import knex from 'knex';
import knexConfig from '../../configs/db.config.js';

const db = knex(knexConfig);

export const createEvalService = async (userId, companyId, rem) => {
  const existingUser = await db('users').where('id_user', userId).first();
  const existingCompany = await db('companies').where('id_company', companyId).first();

  if (!existingUser) {
    throw new Error('User not found');
  }

  if (!existingCompany) {
    throw new Error('Company not found');
  }

  const [newEvalId] = await db('evaluations').insert({
    user_id: userId,
    company_id: companyId,
    rem
  });

  return db('evaluations').where('id_eval', newEvalId).first();
};
