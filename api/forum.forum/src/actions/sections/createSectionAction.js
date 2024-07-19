import { createSectionService } from '../../services/sections/createSectionService.js';

export default async (req, res, next) => {
  try {
    const companyId = req.params.companyId

    const { pictureId, text } = req.body;

    if (!companyId || !text) {
      return res.status(400).json({ error: 'company ID, picture ID and text are required' });
    }

    const newSection = await createSectionService(companyId, pictureId, text);
    res.status(201).json(newSection);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
