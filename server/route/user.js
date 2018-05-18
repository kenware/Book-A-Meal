
import express from 'express';
import userController from '../controller/user';
import middleware from '../middleware/validate';

const validate = new middleware();
const User = new userController();

const router = express.Router();


// User route
router.post('/auth/signup', validate.signup, User.createUser);
router.post('/auth/signin', validate.signin, User.login);
// send reset link to email
router.post('/auth/resetLink', User.sendResetLink);
// update user to admin
router.post('/auth/admin', validate.authUser, User.adminSignup);
// get all users
router.get('/auth/signin', validate.authAdmin, User.getUsers);
export default router;
