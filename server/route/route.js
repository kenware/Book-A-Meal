
const express = require('express'), router = express.Router();





import userController from '../controller/user';

router.post('/auth/signup', new userController().createUser);



export default router;