
import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import userController from '../controller/user';
import middleware from '../middleware/validate';

const validate = new middleware();
const User = new userController();

cloudinary.config({
  cloud_name: 'more-recipes',
  api_key: '127278553653283',
  api_secret: 'XUBlnwpJ2dbSHJzPZu-vTWxgob4'
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'img-upload',
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });


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
// update a user
router.post('/auth/update', validate.authUser, upload.array('file'), User.userUpdate);
export default router;
