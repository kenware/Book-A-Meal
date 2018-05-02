
module.exports = (sequelize, DataTypes) => {
  var Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        Meal.belongsTo(models.user, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
        Meal.belongsToMany(models.Menu, {
          through: 'MealMenus',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Meal;
};
