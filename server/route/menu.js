
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
  .get('/menu', jwtAuth.authUser, Menu.getMenu)
  .get('/myMenu', jwtAuth.authAdmin, Menu.getMyMenu)
  .get('/menuMeals/:menuId', jwtAuth.authUser, validate.menuMeals, Menu.getMenuMeals);
export default router;
