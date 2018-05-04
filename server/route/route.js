
import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';

import userController from '../controller/user';
import validate from '../middleware/validate';
import mealController from '../controller/meal';
import menuController from '../controller/menu';

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


router.post('/auth/signup', new validate().signup, new userController().createUser);
router.post('/auth/signin', new validate().signin, new userController().login);
// set admin user
router.post('/auth/admin/:userId', new validate().auth, new userController().adminSignup);
// get all meals by caterer
router.get('/auth/meals', new validate().auth, new mealController().getMeals);
// admin post meal
router.post('/auth/meals', new validate().auth, upload.array('file'), new mealController().addMeal);
// update a meal
router.put('/auth/meals/:mealId', new validate().auth, upload.array('file'), new mealController().updateMeal);
// delete a meal
router.delete('/auth/meals/:mealId', new validate().auth, new mealController().deleteMeal);
// POST a menu for the day
router.post('/auth/menu',new menuController().createMenu);
export default router;
