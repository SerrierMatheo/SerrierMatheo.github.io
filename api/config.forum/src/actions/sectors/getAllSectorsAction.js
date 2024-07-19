import { getAllSectorsService } from '../../services/sectors/getAllSectorsService.js'

export default async (req, res, next) => {
  try {
    const sectors = await getAllSectorsService();
    res.status(200).json(sectors);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
