import { getAllQuestionsService } from '../../services/questions/getAllQuestionsService.js';

export default async (req, res, next) => {
  try {
    const questions = await getAllQuestionsService();
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
