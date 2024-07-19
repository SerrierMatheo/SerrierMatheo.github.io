import { addTagToCompanyService } from '../../services/tags/addTagToCompanyService.js';

export default async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    const { tagname } = req.body;

    if (!tagname) {
      return res.status(400).json({ error: 'Tagname is required' });
    }

    const newCompanyTag = await addTagToCompanyService(companyId, tagname);
    res.status(201).json(newCompanyTag);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
