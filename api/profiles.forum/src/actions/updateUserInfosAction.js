import { updateUserInfosService } from '../services/updateUserInfosService.js';

export default async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const result = await updateUserInfosService(id, updateFields);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
