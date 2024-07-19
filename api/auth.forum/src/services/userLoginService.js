import knex from 'knex';
import knexConfig from '../configs/db.config.js';
import bcrypt from 'bcrypt';
import moment from 'moment-timezone';

const db = knex(knexConfig);

export const userLoginService = async (username, password) => {
  try {
    // Récupérer l'utilisateur par le nom d'utilisateur
    const user = await db('users').where({ username }).first();
    if (!user) {
      throw new Error('User not found');
    }

    // Vérifier le mot de passe pour les utilisateurs de type intervenant ou admin
    if (user.type === 'intervenant' || user.type === 'admin') {
      const intervenant = await db('intervenants_users').where({ id_user: user.id_user }).first();
      if (!intervenant) {
        throw new Error('Intervenant not found');
      }

      const passwordMatch = await bcrypt.compare(password, intervenant.password);
      if (!passwordMatch) {
        throw new Error('Invalid password');
      }

      // Journaliser l'action de connexion
      await db('logs').insert({
        user_id: user.id_user,
        action_id: 4, // Vous pouvez définir un ID d'action spécifique pour la connexion
        api: 'auth',
        action: 'User logged in',
        timestamp: moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss')
      });

      return {
        id_user: user.id_user,
        username: user.username,
        type: user.type,
        cgu: user.cgu,
        company_id: intervenant.company_id
      };
    } else if (user.type === 'participant') {
      const participant = await db('participants_users').where({ id_user: user.id_user }).first();
      if (!participant) {
        throw new Error('Participant not found ' + user.id_user);
      }

      // Journaliser l'action de connexion
      await db('logs').insert({
        user_id: user.id_user,
        action_id: 4, // Vous pouvez définir un ID d'action spécifique pour la connexion
        api: 'Auth',
        action: 'User logged in',
        timestamp: moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss')
      });

      // Pour les participants, nous n'avons pas de mot de passe à vérifier dans cet exemple
      return {
        id_user: user.id_user,
        username: user.username,
        type: user.type,
        cgu: user.cgu,
        formation_id: participant.formation_id
      };
    } else {
      throw new Error('Unknown user type');
    }
  } catch (error) {
    throw new Error(`Error during user login: ${error.message}`);
  }
};
