import { getAllEvalsService } from '../../services/evaluations/getAllEvalsService.js';

export default async (req, res, next) => {
  try {
    const evaluations = await getAllEvalsService();
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
