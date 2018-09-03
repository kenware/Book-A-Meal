
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('MealMenus', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    MealId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Meals',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    MenuId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Menus',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
<<<<<<< HEAD:server/migrations/20180501181657-create-meal-menu.js
=======
    quantity: {
      type: Sequelize.INTEGER
    },
>>>>>>> bg(fix): Fixed my test and modified my controller:server/migrations/20180818152108-create-order-model-items.js
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('MealMenus')
};
