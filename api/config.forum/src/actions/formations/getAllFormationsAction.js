import { getAllFormationsService } from '../../services/formations/getAllFormationsService.js';

export default async (req, res, next) => {
  try {
    const formations = await getAllFormationsService();
    res.status(200).json(formations);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
