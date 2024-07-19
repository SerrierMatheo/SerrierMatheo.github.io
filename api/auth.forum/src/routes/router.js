import express from 'express';
import userLoginAction from '../actions/userLoginAction.js'

const router = express.Router();

router.post('/login', userLoginAction);

export default router;