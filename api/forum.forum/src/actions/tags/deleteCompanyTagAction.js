import { deleteCompanyTagService } from '../../services/tags/deleteCompanyTagService.js';

export default async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    console.log(companyId);
    const tagId  = req.params.tagId;
    console.log(tagId)

    if (!tagId) {
      return res.status(400).json('tagId is required');
    }

    await deleteCompanyTagService(companyId, tagId);
    res.status(200).json('Tag unassociated from company successfully');
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
};
