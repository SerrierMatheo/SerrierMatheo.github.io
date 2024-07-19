import { getSectionsByCompanyIdService } from '../../services/sections/getSectionsByCompanyIdService.js';

export default async (req, res, next) => {
  try {
    const companyId = req.params.companyId;

    const sections = await getSectionsByCompanyIdService(companyId);
    res.status(200).json(sections);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
