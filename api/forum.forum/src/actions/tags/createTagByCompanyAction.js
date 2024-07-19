import { createTagByCompanyService } from '../../services/tags/createTagByCompanyService.js'

export default async (req, res, next) => {
  try {
    const id = req.params.id;
    const { tagname } = req.body;
    if (!tagname) {
      return res.status(400).json('tagname is required');
    }
    const newTag = await createTagByCompanyService(id, tagname);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json(error.message)
    next(error);
  }
};
