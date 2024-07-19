import { deleteTagService } from '../../services/tags/deleteTagService.js';

export default async (req, res, next) => {
  try {
    const tagId = req.params.id;
    await deleteTagService(tagId);
    res.status(200).json('Tag deleted successfully');
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
