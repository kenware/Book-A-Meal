'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MealMenus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
   mealId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Meals',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    menuId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Menus',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MealMenus');
  }
};
