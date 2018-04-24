

import express from 'express';
const router = express.Router();
import mealController from '../controllers/meals';

router.get('/meals',new mealController().getMeals);
router.post('/meals',new mealController().createMeals);
router.put('/meals/:mealId',new mealController().updateMeal);
router.delete('/meals/:mealId',new mealController().deleteMeal);

export default router;