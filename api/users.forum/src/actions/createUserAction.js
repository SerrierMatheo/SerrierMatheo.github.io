import { createUserService } from '../services/createUserService.js';

export default async (req, res, next) => {
  try {
    const { username, type, company_id, name, firstname } = req.body;

    if (!username || !type || !company_id || !name || !firstname) {
      return res.status(400).json('Username, type, company_id, name and firstname are required');
    }

    const result = await createUserService(username, type, company_id, name, firstname);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
};
