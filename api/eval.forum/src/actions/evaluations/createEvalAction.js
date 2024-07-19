import { createEvalService } from '../../services/evaluations/createEvalService.js';

export default async (req, res, next) => {
  try {
    const { userId, companyId, rem } = req.body;

    if (!userId || !companyId || rem === undefined) {
      return res.status(400).json({ error: 'User ID, company ID, and remark are required' });
    }

    const newEval = await createEvalService(userId, companyId, rem);
    res.status(201).json(newEval);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
