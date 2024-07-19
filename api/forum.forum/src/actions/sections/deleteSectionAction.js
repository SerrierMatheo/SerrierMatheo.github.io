import { deleteSectionService } from '../../services/sections/deleteSectionService.js';

export default async (req, res, next) => {
  try {
    const sectionId = req.params.sectionId;

    const result = await deleteSectionService(sectionId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
};
