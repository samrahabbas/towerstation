'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carrierAddresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carrierId: {
        type: Sequelize.INTEGER
      },
      factoringName: {
        type: Sequelize.STRING
      },
      factoringChecksPayableTo: {
        type: Sequelize.STRING
      },
      factoringStreet1: {
        type: Sequelize.STRING
      },
      factoringStreet2: {
        type: Sequelize.STRING
      },
      factoringCity: {
        type: Sequelize.STRING
      },
      factoringState: {
        type: Sequelize.STRING
      },
      factoringZipCode: {
        type: Sequelize.STRING
      },
      factoringTelephone: {
        type: Sequelize.STRING
      },
      remitChecksPayableTo: {
        type: Sequelize.STRING
      },
      remitStreet1: {
        type: Sequelize.STRING
      },
      remitStreet2: {
        type: Sequelize.STRING
      },
      remitCity: {
        type: Sequelize.STRING
      },
      remitState: {
        type: Sequelize.STRING
      },
      remitZipCode: {
        type: Sequelize.STRING
      },
      remitTelephone: {
        type: Sequelize.STRING
      },

      mailingStreet1: {
        type: Sequelize.STRING
      },
      mailingStreet2: {
        type: Sequelize.STRING
      },
      mailingCity: {
        type: Sequelize.STRING
      },
      mailingState: {
        type: Sequelize.STRING
      },
      mailingZipCode: {
        type: Sequelize.STRING
      },
      mailingTelephone: {
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
    await queryInterface.dropTable('carrierAddresses');
  }
};