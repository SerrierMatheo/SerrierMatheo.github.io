import knex from 'knex';
import knexConfig from '../configs/db.config.js';

const db = knex(knexConfig);

export const getUserInfoService = async (id_user) => {
  try {
    const user = await db('users').where('id_user', id_user).first();

    if (!user) {
      throw new Error('User not found');
    }

    let additionalInfo = {};

    if (user.type === 'intervenant' || user.type === 'admin') {
      additionalInfo = await db('intervenants_users')
        .join('companies', 'intervenants_users.company_id', 'companies.id_company')
        .where('intervenants_users.id_user', id_user)
        .select('intervenants_users.id_user', 'companies.name as company_name', 'intervenants_users.title')
        .first();
    } else if (user.type === 'participant') {
      additionalInfo = await db('participants_users')
        .where('id_user', id_user)
        .select('cv_files', 'formation_id')
        .first();

      if (additionalInfo) {
        const formation = await db('formations')
          .where('id_formation', additionalInfo.formation_id)
          .select('nom')
          .first();
        additionalInfo.formation = formation;
        delete additionalInfo.formation_id; // Supprime l'ID de la formation des informations supplémentaires
      }
    }

    return { ...user, ...additionalInfo };
  } catch (error) {
    throw new Error(`Error retrieving user information: ${error.message}`);
  }
};
