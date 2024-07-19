import { createSectorService } from '../../services/sectors/createSectorService.js';

export default async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newSector = await createSectorService(name);

    res.status(201).json(newSector);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
