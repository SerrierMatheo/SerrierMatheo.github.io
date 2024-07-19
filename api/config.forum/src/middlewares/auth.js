// middlewares/auth.js
import knex from 'knex';
import knexConfig from '../configs/db.config.js';

const db = knex(knexConfig);

export const authenticateUser = async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id']; // Supposons que l'ID utilisateur est passé dans l'en-tête
    if (!userId) {
      return res.status(401).json({ error: 'User ID is required' });
    }

    const user = await db('users').where({ id_user: userId }).first();
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user; // Ajoutez l'utilisateur à la requête pour une utilisation ultérieure
    next();
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Access forbidden: Admins only' });
  }
  next();
};
