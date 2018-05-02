
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING
    },

  }, {
    classMethods: {
      associate(models) {
        Menu.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
        Menu.belongsToMany(models.Meal, {
          through: 'MealMenus',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Menu;
};
