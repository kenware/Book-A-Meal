
import express from 'express';
import userController from '../controller/user';
import middleware from '../middleware/validate';

const validate = new middleware();
const User = new userController();

const router = express.Router();


// User route
router.post('/auth/signup', validate.signup, User.createUser);
router.post('/auth/signin', validate.signin, User.login);
// router.get('/auth/orders', validate.authUser, User.getOrders);
// set admin user
router.post('/auth/admin/:userId', validate.authAdmin, User.adminSignup);
export default router;
