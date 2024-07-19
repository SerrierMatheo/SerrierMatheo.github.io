import { createFormationService } from '../../services/formations/createFormationService.js';

export default async (req, res, next) => {
  try {
    const formationData = req.body;

    const newFormation = await createFormationService(formationData);

    res.status(201).json(newFormation);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
