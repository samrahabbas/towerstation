'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('driverViolations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      driverId: {
        type: Sequelize.INTEGER
      },
      violationType: {
        type: Sequelize.STRING
      },

      date: {
        type: Sequelize.STRING
      },
      violationDescription: {
        type: Sequelize.STRING
      },
      authority: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      fineAmount: {
        type: Sequelize.STRING
      },
      notes: {
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
    await queryInterface.dropTable('driverViolations');
  }
};