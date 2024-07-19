import { getUserPictureService } from '../services/getUserPictureService.js';
import path from 'path';

export default async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const picturePath = await getUserPictureService(id);

    // Si l'utilisateur n'a pas de photo, renvoyer une réponse indiquant qu'il doit ajouter une photo
    if (!picturePath) {
      return res.status(200).json({ message: 'No picture found. Please add a picture.' });
    }

    const absolutePath = path.resolve(picturePath);
    res.sendFile(absolutePath);
  } catch (error) {
    // Si l'erreur est 'User not found', renvoyer une erreur 404
    if (error.message.includes('User not found')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
    next(error);
  }
};
