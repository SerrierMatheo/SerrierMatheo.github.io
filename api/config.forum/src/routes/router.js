import express from 'express';
import getAllSectorsAction from '../actions/sectors/getAllSectorsAction.js'
import createSectorAction from '../actions/sectors/createSectorAction.js'
import deleteSectorAction from '../actions/sectors/deleteSectorAction.js'
import updateSectorAction from '../actions/sectors/updateSectorAction.js'

import { authenticateUser, authorizeAdmin } from '../middlewares/auth.js';
import getAllFormationsAction from '../actions/formations/getAllFormationsAction.js'
import createFormationAction from '../actions/formations/createFormationAction.js'
import deleteFormationAction from '../actions/formations/deleteFormationAction.js'
import updateFormationAction from '../actions/formations/updateFormationAction.js'
import getAllConfigsAction from '../actions/configs/getAllConfigsAction.js'
import updateConfigsAction from '../actions/configs/updateConfigsAction.js'

const router = express.Router();
//Sectors
//getAll -->OK
//update -->OK
//create -->OK
//delete -->OK
router
  .route("/sectors")
  .get(getAllSectorsAction)
  //.post(authenticateUser, authorizeAdmin, createSectorAction)
  .post(createSectorAction)
  .all((req, res, next) => next(405));

router
  .route("/sectors/:id_secteurs_activites")
  //.delete(authenticateUser, authorizeAdmin, deleteSectorAction)
  .delete(deleteSectorAction)
  //.put(authenticateUser, authorizeAdmin, updateSectorAction)
  .put(updateSectorAction)
  .all((req, res, next) => next(405));

//formation
//getAll -->ok
//update -->ok
//create -->ok
//delete -->ok
router
  .route("/formations")
  .get(getAllFormationsAction)
  //.post(authenticateUser, authorizeAdmin, createFormationAction)
  .post(createFormationAction)
  .all((req, res, next) => next(405));

router
  .route("/formations/:id_formation")
  //.delete(authenticateUser, authorizeAdmin, deleteFormationAction)
  .delete(deleteFormationAction)
  //.put(authenticateUser, authorizeAdmin, updateFormationAction)
  .put(updateFormationAction)
  .all((req, res, next) => next(405));


//config
//getall -->ok
//update -->ok
router
  .route("/configs")
  //.get(authenticateUser, authorizeAdmin, getAllConfigsAction)
  .get(getAllConfigsAction)
  //.put(authenticateUser, authorizeAdmin, updateConfigsAction)
  .put(updateConfigsAction)
  .all((req, res, next) => next(405));

export default router;