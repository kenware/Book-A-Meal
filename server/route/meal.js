
import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';


import middleware from '../middleware/validate';
import mealController from '../controller/meal';

const validate = new middleware();
const Meal = new mealController();
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


// Meal Route
// get all meals by caterer
router.get('/meals', validate.authAdmin, Meal.getMeals);
// admin post meal
router.post('/meals', validate.authAdmin, upload.array('file'), Meal.addMeal);
// update a meal
router.put('/meals/:mealId', validate.authAdmin, upload.array('file'), Meal.updateMeal);
// delete a meal
router.delete('/meals/:mealId', validate.authAdmin, Meal.deleteMeal);
// get  most ordered meals
router.get('/mostOrder/meals/:limit', Meal.getMostOrderMeals);
export default router;
