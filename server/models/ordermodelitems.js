
module.exports = (sequelize, DataTypes) => {
  const orderMealItems = sequelize.define('orderMealItems', {
    quantity: {
      type: DataTypes.STRING
    },
    totalPrice: {
      type: DataTypes.INTEGER
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return orderMealItems;
};
