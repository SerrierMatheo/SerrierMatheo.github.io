import { getSectionByIdService } from '../../services/sections/getSectionByIdService.js';

export default async (req, res, next) => {
  try {
    const sectionId = req.params.sectionId;

    const section = await getSectionByIdService(sectionId);
    res.status(200).json(section);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
