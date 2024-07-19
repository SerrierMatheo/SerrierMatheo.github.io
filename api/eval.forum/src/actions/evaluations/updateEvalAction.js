import { updateEvalService } from '../../services/evaluations/updateEvalService.js';

export default async (req, res, next) => {
  try {
    const evalId = req.params.evalId;
    const { user_id, company_id, rem } = req.body;

    if (!user_id && !company_id && !rem) {
      return res.status(400).json({ error: 'At least one field (user_id, company_id, rem) is required' });
    }

    const updatedFields = {};
    if (user_id !== undefined) updatedFields.user_id = user_id;
    if (company_id !== undefined) updatedFields.company_id = company_id;
    if (rem !== undefined) updatedFields.rem = rem;

    const updatedEval = await updateEvalService(evalId, updatedFields);
    res.status(200).json(updatedEval);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
