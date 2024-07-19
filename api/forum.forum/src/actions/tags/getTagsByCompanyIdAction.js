import { getTagsByCompanyIdService } from '../../services/tags/getTagsByCompanyIdService.js';

export default async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const tags = await getTagsByCompanyIdService(companyId);
    res.status(200).json(tags);
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
};
