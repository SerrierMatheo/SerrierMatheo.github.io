import { createQuestionService } from '../../services/questions/createQuestionService.js';

export default async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question text is required' });
    }

    const newQuestion = await createQuestionService(question);
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
