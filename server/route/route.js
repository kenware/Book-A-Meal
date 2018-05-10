
  import express from 'express';
  import multer from 'multer';
  import cloudinary from 'cloudinary';
  import cloudinaryStorage from 'multer-storage-cloudinary';

  import userController from '../controller/user';
  import middleware from '../middleware/validate';
  import mealController from '../controller/meal';
  import menuController from '../controller/menu';
  import orderController from '../controller/order';

  const validate = new middleware();
  const User = new userController();
  const Meal = new mealController();
  const Menu = new menuController();
  const Order = new orderController();
  const router = express.Router();

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

  // User route
  router.post('/auth/signup', validate.signup, User.createUser);
  router.post('/auth/signin', validate.signin, User.login);
  // router.get('/auth/orders', validate.authUser, User.getOrders);
  // set admin user
  router.post('/auth/admin/:userId', validate.authAdmin, User.adminSignup);

  // Meal Route
  // get all meals by caterer
  router.get('/meals', validate.authAdmin, Meal.getMeals);
  // admin post meal
  router.post('/meals', validate.authAdmin, upload.array('file'), Meal.addMeal);
  // update a meal
  router.put('/meals/:mealId', validate.authAdmin, upload.array('file'), Meal.updateMeal);
  // delete a meal
  router.delete('/meals/:mealId', validate.authAdmin, Meal.deleteMeal);

  // Menu route
  // POST a menu for the day
  router.post('/menu', validate.authAdmin, validate.menu, Menu.createMenu);
  // get todays menu
  router.get('/menu', validate.authUser, Menu.getMenu);
  // Get menu of any day
  router.get('/menu/:date', validate.authAdmin, Menu.getMenu);

  // Order route
  // POST an order for the day
  router.post('/orders', validate.authUser, validate.order, Order.createOrder);
  router.put('/orders/:orderId', validate.updateOrder, validate.authUser, Order.updateOrder);
  router.get('/orders', validate.authAdmin, Order.getOrders);
  export default router;
