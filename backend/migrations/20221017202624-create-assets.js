'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      driver: {
        type: Sequelize.STRING
      },
      driverPhone: {
        type: Sequelize.STRING
      },
      driverEmail: {
        type: Sequelize.STRING
      },
      powerUnit: {
        type: Sequelize.STRING
      },
      powerUnitModel: {
        type: Sequelize.STRING
      },
      powerUnitLicensePlate: {
        type: Sequelize.STRING
      },
      trailer: {
        type: Sequelize.STRING
      },
      trailerModel: {
        type: Sequelize.STRING
      },
      trailerType: {
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
    await queryInterface.dropTable('assets');
  }
};