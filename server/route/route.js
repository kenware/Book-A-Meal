
import express from 'express';


import userController from '../controller/user';
import middleware from '../middleware/validate';

const validate = new middleware();

const router = express.Router();

router.post('/auth/signup', validate.signup, new userController().createUser);


export default router;
