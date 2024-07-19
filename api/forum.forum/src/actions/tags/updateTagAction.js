import { updateTagService } from '../../services/tags/updateTagService.js';

export default async (req, res, next) => {
  try {
    const id = req.params.id;
    const { tagname } = req.body;
    if (!tagname) {
      return res.status(400).json({ error: 'tagname is required' });
    }

    const updatedTag = await updateTagService(id, tagname);
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
};
