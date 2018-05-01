import shortcode from 'date-shortcode';
import menuModel from '../models/menu';
import mealModel from '../models/meal';
const menus = new menuModel();
const meals = new mealModel();


export default class menuController {

  createMenu(req, res) {
    let { title } = req.body;
    let { mealsId,menuDate } = req.body;
    const menuMeals = [];
    if(!title){
      return res.status(405).json('title is required');
    }else if(!mealsId){
      return res.status(405).json('select meals to set menu');
    }
    if (!menuDate) {
      menuDate = shortcode.parse('{YYYY-MM-DD}', new Date());
    }
    // enable posting of mealsId of comma seperated string
    if (typeof mealsId === 'string') {
      mealsId = mealsId.split(',');
    }
    // select meals from meal table using meal id
    const allMenu = menus.getAll();
    //autogerate menu id
    const id = allMenu.reverse()[0].id + 1;
    for (const menu of allMenu){
      if(menu.menuDate === menuDate){
        return res.status(404).json('menu of '+ menuDate+' already exist')
      }
    }
    const allMeals = meals.getMeals();
    for (const meal of allMeals) {
      for (const eachId of req.body.mealsId) {
        if (meal.id === parseInt(eachId)) {
          menuMeals.push(meal);
        }
      }
    }
    menus.addMenu(id,title,menuDate,menuMeals);
    return res.status(200).json({id,title,menuDate,meals:menuMeals});
  }

  // get menu for today
  getMenu(req, res) {
    const date = shortcode.parse('{YYYY-MM-DD}', new Date());
    const allMenu = menus.getAll();
    for (const eachMenu of allMenu) {
      if (eachMenu.menuDate === date) {
        return res.status(201).json(eachMenu);
      }
    }
    return res.status(400).json('today menu is not set');
  }

  // get menu for any day
  getAnyMenu(req, res) {
    const date = req.params.date;
    const allMenu = menus.getAll();
    for (const eachMenu of allMenu) {
      if (eachMenu.menuDate === date) {
        return res.status(201).json(eachMenu);
      }
    }
    const message = `menu of ${date} is not set`;
    return res.status(400).json(message);
  }
}
