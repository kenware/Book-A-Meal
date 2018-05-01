import dumyData from '../dumydata/store';
const menus = dumyData.menus;

export default class Menu {
    getAll(){
      return menus;
    }
    addMenu(id, title, menuDate, meals){
      const menu = { id, title, menuDate, meals }
      menus.push(menu);
      return menu;
    }
  }