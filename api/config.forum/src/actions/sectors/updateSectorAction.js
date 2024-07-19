import { updateSectorService } from '../../services/sectors/updateSectorService.js';

export default async (req, res, next) => {
  try {
    const { id_secteurs_activites } = req.params;
    const updateFields = req.body;

    if (!id_secteurs_activites) {
      return res.status(400).json({ error: 'Sector ID is required' });
    }

    const updatedSector = await updateSectorService(id_secteurs_activites, updateFields);

    res.status(200).json(updatedSector);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
