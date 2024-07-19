import { updateUserService } from '../services/updateUserService.js';

export default async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Vérifier que les champs à mettre à jour sont fournis
    if (!updates.username && !updates.type && !updates.cgu) {
      return res.status(400).json('At least one field (username, type, cgu) is required for update');
    }

    const result = await updateUserService(id, updates);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
};
