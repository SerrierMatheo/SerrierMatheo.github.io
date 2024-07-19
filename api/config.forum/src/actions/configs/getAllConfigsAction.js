import { getAllConfigsService } from '../../services/configs/getAllConfigsService.js';

export default async (req, res, next) => {
  try {
    const config = await getAllConfigsService();
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
