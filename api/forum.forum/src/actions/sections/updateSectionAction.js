import { updateSectionService } from '../../services/sections/updateSectionService.js';

export default async (req, res, next) => {
  try {
    const sectionId = req.params.sectionId;
    const { text, pictureId } = req.body;

    if (text === undefined && pictureId === undefined) {
      return res.status(400).json({ error: 'At least one of text or pictureId is required' });
    }

    const updatedSection = await updateSectionService(sectionId, text, pictureId);
    res.status(200).json(updatedSection);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
