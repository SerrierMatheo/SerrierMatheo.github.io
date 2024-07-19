import { deleteSectorService } from '../../services/sectors/deleteSectorService.js';

export default async (req, res, next) => {
  try {
    const { id_secteurs_activites } = req.params;

    if (!id_secteurs_activites) {
      return res.status(400).json({ error: 'Sector ID is required' });
    }

    const result = await deleteSectorService(id_secteurs_activites);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
