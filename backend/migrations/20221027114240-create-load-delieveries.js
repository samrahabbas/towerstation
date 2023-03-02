'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loadDelieveries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      loadId: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      pickupDate: {
        type: Sequelize.STRING
      },
      dropDate: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('loadDelieveries');
  }
};