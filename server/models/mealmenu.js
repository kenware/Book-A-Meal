'use strict';
module.exports = (sequelize, DataTypes) => {
  var MealMenu = sequelize.define('MealMenu', {
    MealId: DataTypes.INTEGER,
    MenuId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MealMenu;
};