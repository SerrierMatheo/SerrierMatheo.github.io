import knex from 'knex';
import knexConfig from '../configs/db.config.js';
import bcrypt from 'bcrypt';
import moment from 'moment-timezone';

const db = knex(knexConfig);

const generateSecurePassword = () => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";

  while (!(
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password) &&
    password.length >= length
  )) {
    password = Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
  }

  return password;
};

export const createUserService = async (username, type, company_id, name, firstname) => {
  try {
    const existingUser = await db('users').where('username', username).first();

    if (existingUser) {
      throw new Error('User with this username already exists');
    }

    const [insertedUserId] = await db('users').insert({
      username: username,
      type: type,
      cgu: 'non',
      picture: null,
      phone: null,
      name: name,
      firstname: firstname,
      mail: null
    });

    let plainPassword = null;
    if ((type === 'intervenant') || (type === 'admin')) {
      plainPassword = generateSecurePassword();
      const hashedPassword = await bcrypt.hash(plainPassword, 10); // Hachage du mot de passe

      await db('intervenants_users').insert({
        id_user: insertedUserId,
        company_id: company_id,
        title: null,
        password: hashedPassword
      });
    }

    // Journaliser l'action de connexion
    await db('logs').insert({
      user_id: insertedUserId,
      action_id: 1, // Vous pouvez définir un ID d'action spécifique pour la connexion
      api: 'users',
      action: 'created user',
      timestamp: moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss')
    });


    return { id_user: insertedUserId, username, type, plainPassword};

  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};
