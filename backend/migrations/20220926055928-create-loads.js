'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      origin: {
        type: Sequelize.STRING
      },
      DHO: {
        type: Sequelize.STRING
      },
      DHD: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      offer: {
        type: Sequelize.STRING
      },
      truckTypeGroup: {
        type: Sequelize.STRING
      },
      truckTypes: {
        type: Sequelize.STRING
      },
      loadType: {
        type: Sequelize.STRING
      },
      lookBackHours: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.STRING
      },
      endDate: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      pickup: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      trip: {
        type: Sequelize.STRING
      },
      eq: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.STRING
      },
      factor: {
        type: Sequelize.STRING
      },
      cs: {
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
    await queryInterface.dropTable('loads');
  }
};