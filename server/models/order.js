
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    address: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    catererId: {
      type: DataTypes.INTEGER
    }
  });
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'user'
    });
    Order.belongsToMany(models.Meal, {
      through: 'orderMealItems',
      onDelete: 'CASCADE',
      as: 'meals'
    });
  };
  return Order;
};
