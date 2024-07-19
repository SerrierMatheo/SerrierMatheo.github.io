import { getAllTagsService } from '../../services/tags/getAllTagsService.js'

export default async (req, res, next) => {
  try {
    const tags = await getAllTagsService();
    res.status(200).json(tags);
  } catch (error) {
    next(500);
  }
};