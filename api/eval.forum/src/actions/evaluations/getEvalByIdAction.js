import { getEvalByIdService } from '../../services/evaluations/getEvalByIdService.js';

export default async (req, res, next) => {
  try {
    const evalId = req.params.evalId;

    const evaluation = await getEvalByIdService(evalId);
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
