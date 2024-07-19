import express from 'express';
import getAllRdvAction from '../actions/rdvs/getAllRdvAction.js'
import getRdvByUserAction from '../actions/rdvs/getRdvByUserAction.js'
import createSlotAction from '../actions/slots/createSlotAction.js'
import getSlotsByCompanyIdAction from '../actions/slots/getSlotsByCompanyIdAction.js'
import deleteSlotAction from '../actions/slots/deleteSlotAction.js'
import updateSlotAction from '../actions/slots/updateSlotAction.js'
import deleteRdvAction from '../actions/rdvs/deleteRdvAction.js'
import claimRdvAction from '../actions/rdvs/claimRdvAction.js'

const router = express.Router();

router
  .route("/rdvs")
  .get(getAllRdvAction)
  .post(claimRdvAction)
  .all((req, res, next) => next(405));

router
  .route('/rdvs/:rdvId')
  .delete(deleteRdvAction)
  .all((req, res, next) => next(405));

router
  .route('/rdvs/users/:userId')
  .get(getRdvByUserAction)
  .all((req, res, next) => next(405));

router
  .route("/company/:companyId/slots")
  .get(getSlotsByCompanyIdAction)
  .post(createSlotAction)
  .all((req, res, next) => next(405));

router
  .route("/slots/:slotId")
  .put(updateSlotAction)
  .delete(deleteSlotAction)
  .all((req, res, next) => next(405));
export default router;
