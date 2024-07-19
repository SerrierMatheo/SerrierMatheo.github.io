import { updateFormationService } from '../../services/formations/updateFormationService.js';

export default async (req, res, next) => {
  try {
    const { id_formation } = req.params;
    const updateFields = req.body;

    if (!id_formation) {
      return res.status(400).json({ error: 'Formation ID is required' });
    }

    const updatedFormation = await updateFormationService(id_formation, updateFields);

    res.status(200).json(updatedFormation);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
