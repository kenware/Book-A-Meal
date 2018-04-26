import shortcode from 'date-shortcode';
import menus from '../models/menu';
import allMeals from '../models/meal';


export default class menuController {
  createMenu(req, res) {
    const todayMenu = req.body;
    const { title, id } = todayMenu;
    let { mealsId, menuDate } = todayMenu;
    const meals = [];
    // enable posting of mealsId of comma seperated string
    if (typeof mealsId === 'string') {
      mealsId = mealsId.split(',');
    }
    // select meals from meal table using meal id
    for (const meal of allMeals) {
      for (const eachId of mealsId) {
        if (meal.id === parseInt(eachId)) {
          meals.push(meal);
        }
      }
    }
    if (!menuDate) {
      menuDate = shortcode.parse('{YYYY-MM-DD}', new Date());
    }
    menus.push({
      title,
      menuDate,
      meals,
    });
    return res.status(200).json({
      id,
      title,
      menuDate,
      meals,
    });
  }
  getMenu(req, res) {
    const date = shortcode.parse('{YYYY-MM-DD}', new Date());
    let meals = [];
    for (const eachMenu of menus) {
      if (eachMenu.menuDate === date) {
        meals = eachMenu.meals.concat(meals);
      }
    }
    if (meals.length > 0) {
      const title = 'todays menu';
      return res.status(201).json({
        title,
        date,
        meals
      });
    }
    return res.status(400).json('today menu is not set');
  }
}
