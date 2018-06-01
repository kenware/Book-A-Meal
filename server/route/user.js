
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
// reset password
router.post('/auth/reset', validate.authUser, User.resetPassword);
// update user to admin 
router.post('/auth/admin', validate.authUser, User.adminSignup);
// get all users
router.get('/auth/user', validate.authUser, User.getUser);
// get notification
router.get('/notifications', validate.authUser, User.userNotification);
// refresh user token
router.get('/refresh', validate.authUser, User.refreshToken);
export default router;
