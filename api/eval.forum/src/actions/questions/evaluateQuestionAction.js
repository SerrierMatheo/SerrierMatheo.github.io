import { evaluateQuestionService } from '../../services/questions/evaluateQuestionService.js';

export default async (req, res, next) => {
  try {
    const evalId = req.params.evalId;
    const questionId = req.params.questionId;
    const { grade } = req.body;

    if (grade === undefined) {
      return res.status(400).json({ error: 'Grade is required' });
    }

    const evaluatedQuestion = await evaluateQuestionService(evalId, questionId, grade);
    res.status(200).json(evaluatedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
