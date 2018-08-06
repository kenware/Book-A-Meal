
import express from 'express';
import cloudinaryConfig from '../helpers/cloudinaryConfig';
import auth from '../middleware/jwtAuth';
import middleware from '../middleware/mealValidator';
import mealController from '../controller/meal';

const upload = new cloudinaryConfig().cloudinary();
const jwtAuth = new auth();
const validate = new middleware();
const Meal = new mealController();
const router = express.Router();

// Meal Route
// get all meals by caterer
router
  .get('/meals', jwtAuth.authAdmin, Meal.getMeals)
// admin post meal
  .post('/meals', jwtAuth.authAdmin, upload.array('file'), validate.addMeal, Meal.addMeal)
// update a meal
  .put('/meals/:mealId', jwtAuth.authAdmin, upload.array('file'), validate.updateMeal, Meal.updateMeal)
// delete a meal
  .delete('/meals/:mealId', jwtAuth.authAdmin, Meal.deleteMeal)
// get  most ordered meals
  .get('/mostOrder/meals', Meal.getMostOrderMeals)
// get one meal
  .get('/meals/:mealId', jwtAuth.authAdmin, Meal.getOneMeal);
export default router;
