'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('powerUnitLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      mileage: {
        type: Sequelize.STRING
      },
      date:{
        type: Sequelize.STRING
      },
      maintenanceType:{
        type: Sequelize.STRING
      },
      maintenancePerformed:{
        type: Sequelize.STRING
      },
      performedBy:{
        type: Sequelize.STRING
      },
      location:{
        type: Sequelize.STRING
      },
      billTo:{
        type: Sequelize.STRING
      },
      amount:{
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
    await queryInterface.dropTable('powerUnitLogs');
  }
};