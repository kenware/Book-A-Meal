
module.exports = (sequelize, DataTypes) => {
  const MealMenu = sequelize.define('MealMenu', {
    MealId: DataTypes.INTEGER,
    MenuId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return MealMenu;
};
