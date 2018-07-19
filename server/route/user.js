
import express from 'express';
import dotenv from 'dotenv';
import userController from '../controller/user';
import mailController from '../controller/mailer';
import middleware from '../middleware/userValidator';
import auth from '../middleware/jwtAuth';
import cloudinaryConfig from '../helpers/cloudinaryConfig';

const upload = new cloudinaryConfig().cloudinary();
const Mail = new mailController();
const validate = new middleware();
const jwtAuth = new auth();
const User = new userController();

const router = express.Router();


// User route
router
  .post('/auth/signup', validate.signup, User.createUser)
  .post('/auth/signin', validate.signin, User.login)
// send reset link to email
  .post('/auth/resetLink', User.sendResetLink, Mail.changePassword)
// reset password
  .post('/auth/reset', jwtAuth.authUser, User.resetPassword)
// update user to admin
  .post('/auth/admin', jwtAuth.authUser, User.adminSignup)
// get all users
  .get('/auth/user', jwtAuth.authUser, User.getUser)
// get notification
  .get('/notifications', jwtAuth.authUser, User.userNotification)
// refresh user token
  .get('/refresh', jwtAuth.authUser, User.refreshToken)
// update a user
  .post('/auth/update', jwtAuth.authUser, upload.array('file'), User.userUpdate);
export default router;
