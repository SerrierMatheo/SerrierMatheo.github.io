import { getEvalsByUserIdService } from '../../services/evaluations/getEvalsByUserIdService.js';

export default async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const evaluations = await getEvalsByUserIdService(userId);
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
