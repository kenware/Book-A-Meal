import shortcode from 'date-shortcode';
import menus from '../models/menu';
import allMeals from '../models/meal';


export default class menuController {
  createMenu(req, res) {
    const todayMenu = req.body;
    let mealsId;
    const meals = [];
    if (typeof todayMenu.mealsId === 'string') {
      mealsId = todayMenu.mealsId.split(',');
    } else {
      mealsId = todayMenu.mealsId;
    }
    for (const meal of allMeals) {
      for (const eachId of mealsId) {
        if (meal.id === parseInt(eachId)) {
          meals.push(meal);
        }
      }
    }
    let date;
    if (todayMenu.menuDate === undefined) {
      date = shortcode.parse('{YYYY-MM-DD}', new Date());
      todayMenu.menuDate = date;
    }
    menus.push({
      title: todayMenu.title,
      menuDate: date,
      meals,
    });
    return res.status(200).json({
      id: todayMenu.id,
      title: todayMenu.title,
      date,
      meals,
    });
  }
  getMenu(req, res) {
    const date = shortcode.parse('{YYYY-MM-DD}', new Date());
    let menuMeals = [];
    for (const eachMenu of menus) {
      if (eachMenu.menuDate === date) {
        menuMeals = eachMenu.meals.concat(menuMeals);
      }
    }
    if (menuMeals.length > 0) {
      return res.status(201).json({
        title: 'todays menu',
        date,
        meals: menuMeals
      });
    }
    return res.status(400).json('today menu is not set');
  }
}
