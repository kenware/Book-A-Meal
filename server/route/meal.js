
import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';

import middleware from '../middleware/validate';
import mealController from '../controller/meal';

dotenv.config();
const validate = new middleware();
const Meal = new mealController();
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
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
router
  .get('/meals', validate.authAdmin, Meal.getMeals)
// admin post meal
  .post('/meals', validate.authAdmin, upload.array('file'), Meal.addMeal)
// update a meal
  .put('/meals/:mealId', validate.authAdmin, upload.array('file'), Meal.updateMeal)
// delete a meal
  .delete('/meals/:mealId', validate.authAdmin, Meal.deleteMeal)
// get  most ordered meals
  .get('/mostOrder/meals/:limit', Meal.getMostOrderMeals)
// get one meal

  .get('/meals/:mealId', validate.authAdmin, Meal.getOneMeal);
export default router;
