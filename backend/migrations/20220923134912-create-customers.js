'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
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
      cellPhone: {
        type: Sequelize.STRING
      },
      fax: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      privateNotes: {
        type: Sequelize.STRING
      },
      creditLimit: {
        type: Sequelize.STRING
      },
      isCreditHold: {
        type: Sequelize.STRING
      },
      availableCredit: {
        type: Sequelize.STRING
      },
      paymentTerms: {
        type: Sequelize.STRING
      },
      mcNumberType: {
        type: Sequelize.STRING
      },
      mcNumber: {
        type: Sequelize.STRING
      },
      usdotNumber: {
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
    await queryInterface.dropTable('customers');
  }
};