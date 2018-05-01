'use strict';
module.exports = (sequelize, DataTypes) => {
  var MealMenu = sequelize.define('MealMenu', {
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MealMenu;
};