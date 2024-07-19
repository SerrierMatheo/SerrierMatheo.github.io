import { updateQuestionService } from '../../services/questions/updateQuestionService.js';

export default async (req, res, next) => {
  try {
    const questionId = req.params.questionId;
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question text is required' });
    }

    const updatedQuestion = await updateQuestionService(questionId, question);
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
