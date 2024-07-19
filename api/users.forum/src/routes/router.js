import express from 'express';
import getAllUsersAction from '../actions/getAllUsersAction.js'
import getUserByIdAction from '../actions/getUserByIdAction.js'
import deleteUserByIdAction from '../actions/deleteUserByIdAction.js'
import createUserAction from '../actions/createUserAction.js'
import updateUserAction from '../actions/updateUserAction.js'

const router = express.Router();

//getAll ok
//getById ok
//create ok
//delete ok
//update ok
router
  .route("/users")
  .get(getAllUsersAction) // /users?keyword=john
  .post(createUserAction)
  .all((req, res, next) => next(405));

router
  .route("/users/:id")
  .get(getUserByIdAction)
  .delete(deleteUserByIdAction)
  .put(updateUserAction)
  .all((req, res, next) => next(405));
export default router;