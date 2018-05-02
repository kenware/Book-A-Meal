
module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
    message: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        notification.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return notification;
};
