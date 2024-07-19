import path from 'path';
import { getUserCvService } from '../services/getUserCvService.js';

export default async (req, res, next) => {
  try {
    const { id_user } = req.params;

    if (!id_user) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const cvFilePath = await getUserCvService(id_user);

    // Si le participant n'a pas de CV, renvoyer une réponse indiquant qu'il doit ajouter un CV
    if (!cvFilePath) {
      return res.status(200).json({ message: 'CV manquant. Veuillez ajouter un CV.' });
    }

    const filePath = path.resolve(cvFilePath);
    res.sendFile(filePath);
  } catch (error) {
    // Si l'erreur est 'Participant not found', renvoyer une erreur 404
    if (error.message.includes('Participant not found')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
    next(error);
  }
};