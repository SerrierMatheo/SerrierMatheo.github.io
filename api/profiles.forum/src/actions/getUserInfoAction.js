import { getUserInfoService } from '../services/getUserInfoService.js';

export default async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json('User ID is required');
    }

    const userInfo = await getUserInfoService(id);
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
};
