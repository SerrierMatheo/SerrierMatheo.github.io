import knex from 'knex';
import knexConfig from '../../configs/db.config.js';
import moment from 'moment-timezone';

const db = knex(knexConfig);

export const updateConfigsService = async (updateFields) => {
  try {
    const existingConfigs = await db('configs').select('id_config', 'key', 'value');

    const updatePromises = Object.entries(updateFields).map(async ([key, value]) => {
      const existingConfig = existingConfigs.find(config => config.key === key);

      if (existingConfig) {
        // Update existing config
        await db('configs')
          .where({ id_config: existingConfig.id_config })
          .update({ value });
      } else {
        // Insert new config if it doesn't exist
        await db('configs').insert({ key, value });
      }
    });

    await Promise.all(updatePromises);

    // Log action (commented out for demonstration)
    // await db('logs').insert({
    //   user_id: user.id_user,
    //   action_id: 2, // Vous pouvez définir un ID d'action spécifique pour la connexion
    //   api: 'configs',
    //   action: 'updated configs',
    //   timestamp: moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss')
    // });

    // Return all configs after update
    return db('configs').select();
  } catch (error) {
    throw new Error(`Error updating configs: ${error.message}`);
  }
};
