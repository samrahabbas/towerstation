'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carriers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      street1: {
        type: Sequelize.STRING
      },
      street2: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      checksPayableTo: {
        type: Sequelize.STRING
      },
      isOKToLoad: {
        type: Sequelize.STRING
      },
      privateNotes: {
        type: Sequelize.STRING
      },
      MCFFMXNumber: {
        type: Sequelize.STRING
      },
      USDOTNumber: {
        type: Sequelize.STRING
      },
      taxIDNumber: {
        type: Sequelize.STRING
      },
      is1099Vendor: {
        type: Sequelize.STRING
      },
      paymentTerms: {
        type: Sequelize.STRING
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      primaryInsuranceDetails: {
        type: Sequelize.STRING
      },
      primaryInsuranceExpirationDate: {
        type: Sequelize.STRING
      },
      cargoInsuranceDetails: {
        type: Sequelize.STRING
      },
      cargoInsuranceExpirationDate: {
        type: Sequelize.STRING
      },
      weightUnit: {
        type: Sequelize.STRING
      },
      distanceUnit: {
        type: Sequelize.STRING
      },
      temperatureUnit: {
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
    await queryInterface.dropTable('carriers');
  }
};