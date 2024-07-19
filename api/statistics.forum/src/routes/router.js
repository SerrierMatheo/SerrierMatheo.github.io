import express from 'express';
import getCompaniesNbAction from '../actions/getCompaniesNbAction.js'
import getIntervenantsNbAction from '../actions/getIntervenantsNbAction.js';

const router = express.Router();

router
  .route("/companiesnb")
  .get(getCompaniesNbAction)
  .all((req, res, next) => next(405));

router
  .route("/intervenantsnb")
  .get(getIntervenantsNbAction)
  .all((req, res, next) => next(405));

export default router;