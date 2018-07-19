
import express from 'express';
import middleware from '../middleware/validate';
import mailController from '../controller/mailer';
import menuController from '../controller/menu';

const validate = new middleware();
const Menu = new menuController();
const Mail = new mailController();
const router = express.Router();


// Menu route
// POST a menu for the day
router
  .post('/menu', validate.authAdmin, validate.menu, Menu.createMenu, Mail.sendMail)
// get todays menu
  .get('/menu', validate.authUser, Menu.getMenu)
// Get menu of any day
  .get('/menu/:date', validate.authAdmin, Menu.getMenu);

export default router;
