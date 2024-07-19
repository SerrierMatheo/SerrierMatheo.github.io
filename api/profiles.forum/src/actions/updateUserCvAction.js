import { updateUserCvService } from '../services/updateUserCvService.js';

export default async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const cvPath = req.file ? req.file.path : null;

    console.log('id_user:', id_user);
    console.log('req.file:', req.file);

    if (!id_user) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    if (!cvPath) {
      return res.status(400).json({ error: 'File is required' });
    }

    const result = await updateUserCvService(id_user, cvPath);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
