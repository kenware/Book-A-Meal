
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
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
  });
  Meal.associate = (models) => {
    Meal.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Meal.belongsToMany(models.Menu, {
      through: 'MealMenus',
      onDelete: 'CASCADE'
    });
    Meal.belongsToMany(models.Order, {
      through: 'orderMealItems',
      onDelete: 'CASCADE',
      as: 'orders'
    });
  };
  return Meal;
};
