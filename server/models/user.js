
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Meal, {
      foreignKey: 'userId',
      as: 'meals'
    });
    User.hasMany(models.notification, {
      foreignKey: 'userId',
      as: 'notifications'
    });
    User.hasMany(models.Menu, {
      foreignKey: 'userId',
      as: 'menus'
    });
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders'
    });
  };
  return User;
};
