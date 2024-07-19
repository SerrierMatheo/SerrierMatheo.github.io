import { updateUserPictureService } from '../services/updateUserPictureService.js';

export default async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const picturePath = req.file.path;

    if (!id_user) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const result = await updateUserPictureService(id_user, picturePath);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
