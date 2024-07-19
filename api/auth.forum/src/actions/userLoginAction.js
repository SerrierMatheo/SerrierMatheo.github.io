import { userLoginService } from '../services/userLoginService.js';

export default async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await userLoginService(username, password);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
