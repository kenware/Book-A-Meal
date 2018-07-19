
import express from 'express';
import middleware from '../middleware/menuValidator';
import auth from '../middleware/jwtAuth';
import mailController from '../controller/mailer';
import menuController from '../controller/menu';

const validate = new middleware();
const jwtAuth = new auth();
const Menu = new menuController();
const Mail = new mailController();
const router = express.Router();


// Menu route
// POST a menu for the day
router
  .post('/menu', jwtAuth.authAdmin, validate.menu, Menu.createMenu, Mail.sendMail)
// get todays menu
  .get('/menu', jwtAuth.authUser, Menu.getMenu)
// Get menuMeals of today's menu
  .get('/menuMeals/:menuId', jwtAuth.authUser, Menu.getMenuMeals);

export default router;
