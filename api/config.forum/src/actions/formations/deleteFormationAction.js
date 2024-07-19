import { deleteFormationService } from '../../services/formations/deleteFormationService.js';

export default async (req, res, next) => {
  try {
    const { id_formation } = req.params;

    if (!id_formation) {
      return res.status(400).json({ error: 'Formation ID is required' });
    }

    const result = await deleteFormationService(id_formation);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
