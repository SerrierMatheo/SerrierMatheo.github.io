import { getEvalsByCompanyIdService } from '../../services/evaluations/getEvalsByCompanyIdService.js';

export default async (req, res, next) => {
  try {
    const companyId = req.params.companyId;

    const evaluations = await getEvalsByCompanyIdService(companyId);
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
