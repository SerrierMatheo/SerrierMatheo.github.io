import express from 'express';
import getAllQuestionsAction from '../actions/questions/getAllQuestionsAction.js'
import createQuestionAction from '../actions/questions/createQuestionAction.js'
import updateQuestionAction from '../actions/questions/updateQuestionAction.js'
import getAllEvalsAction from '../actions/evaluations/getAllEvalsAction.js'
import getEvalsByUserIdAction from '../actions/evaluations/getEvalsByUserIdAction.js'
import getEvalsByCompanyIdAction from '../actions/evaluations/getEvalsByCompanyIdAction.js'
import updateEvalAction from '../actions/evaluations/updateEvalAction.js'
import createEvalAction from '../actions/evaluations/createEvalAction.js'
import getEvalByIdAction from '../actions/evaluations/getEvalByIdAction.js'
import evaluateQuestionAction from '../actions/questions/evaluateQuestionAction.js'

const router = express.Router();

router
  .route('/questions')
  .get(getAllQuestionsAction)
  .post(createQuestionAction)
  .all((req, res, next) => next(405));

router
  .route('/questions/:questionId')
  .put(updateQuestionAction)
  .all((req, res, next) => next(405));

router
  .route('/evaluations')
  .get(getAllEvalsAction)
  .post(createEvalAction)
  .all((req, res, next) => next(405));

router
  .route('/evaluations/user/:userId')
  .get(getEvalsByUserIdAction)
  .all((req, res, next) => next(405));

router
  .route('/evaluations/company/:companyId')
  .get(getEvalsByCompanyIdAction)
  .all((req, res, next) => next(405));

router
  .route('/evaluations/:evalId')
  .get(getEvalByIdAction)
  .put(updateEvalAction)
  .all((req, res, next) => next(405));

router
  .route('/evaluations/:evalId/questions/:questionId')
  .put(evaluateQuestionAction)
  .all((req, res, next) => next(405));

export default router;