import knex from 'knex';
import knexConfig from '../configs/db.config.js';
import moment from 'moment-timezone';

const db = knex(knexConfig);

// Utilisateur fictif pour représenter les utilisateurs supprimés
const DELETED_USER_ID = 0;

export const deleteUserByIdService = async (id_user) => {
  try {
    await db.transaction(async trx => {
      try {
        console.log('Disabling foreign key checks');
        await trx.raw('SET FOREIGN_KEY_CHECKS = 0');

        console.log('Deleting evaluations for user:', id_user);
        let deleted = await trx('evaluations').where('user_id', id_user).del();
        console.log(`Deleted ${deleted} evaluations for user:`, id_user);

        console.log('Deleting intervenants_users for user:', id_user);
        deleted = await trx('intervenants_users').where('id_user', id_user).del();
        console.log(`Deleted ${deleted} intervenants_users for user:`, id_user);

        console.log('Deleting participants_users for user:', id_user);
        deleted = await trx('participants_users').where('id_user', id_user).del();
        console.log(`Deleted ${deleted} participants_users for user:`, id_user);

        console.log('Deleting rdvs for user:', id_user);
        deleted = await trx('rdvs').where('user_id', id_user).del();
        console.log(`Deleted ${deleted} rdvs for user:`, id_user);

        console.log('Anonymizing logs for user:', id_user);
        await trx('logs').where('user_id', id_user).update({ user_id: DELETED_USER_ID });
        console.log(`Anonymized logs for user:`, id_user);

        console.log('Deleting user:', id_user);
        deleted = await trx('users').where('id_user', id_user).del();
        console.log(`Deleted ${deleted} user:`, id_user);

        console.log('Enabling foreign key checks');
        await trx.raw('SET FOREIGN_KEY_CHECKS = 1');

        await trx.commit();
        console.log('Transaction committed for user:', id_user);
      } catch (err) {
        await trx.rollback();
        console.error('Transaction rolled back for user:', id_user, err);
        await trx.raw('SET FOREIGN_KEY_CHECKS = 1');  // Ensure FK checks are enabled again
        throw err;
      }
    });

    return { message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error(`Error deleting user: ${error.message}`);
  }
};
