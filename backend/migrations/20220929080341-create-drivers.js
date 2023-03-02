'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('drivers', {
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
        type: Sequelize.TEXT
      },
      middleName: {
        type: Sequelize.TEXT
      },
      lastName: {
        type: Sequelize.TEXT
      },
      street1: {
        type: Sequelize.TEXT
      },
      street2: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.TEXT
      },
      state: {
        type: Sequelize.TEXT
      },
      zipCode: {
        type: Sequelize.TEXT
      },
      cellPhone: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT
      },
      driverType: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.TEXT
      },
      dateOfBirth: {
        type: Sequelize.TEXT
      },
      driverNumber: {
        type: Sequelize.TEXT
      },
      ownershipType: {
        type: Sequelize.TEXT
      },
      weightUnit: {
        type: Sequelize.TEXT
      },
      distanceUnit: {
        type: Sequelize.TEXT
      },
      temperatureUnit: {
        type: Sequelize.TEXT
      },
      notes: {
        type: Sequelize.TEXT
      },
      commercialDriverSinceYear: {
        type: Sequelize.TEXT
      },
      experienceType: {
        type: Sequelize.TEXT
      },
      drivingSchool: {
        type: Sequelize.TEXT
      },
      CDLNumber: {
        type: Sequelize.TEXT
      },
      licenseType: {
        type: Sequelize.TEXT
      },
      licenseEndorsements: {
        type: Sequelize.TEXT
      },
      applicationDate: {
        type: Sequelize.TEXT
      },
      hireDate: {
        type: Sequelize.TEXT
      },
      terminationDate: {
        type: Sequelize.TEXT
      },
      canHireAgain: {
        type: Sequelize.TEXT
      },
      bonusEligibilityDate: {
        type: Sequelize.TEXT
      },
      employmentNotes: {
        type: Sequelize.TEXT
      },
      insuranceCompany: {
        type: Sequelize.TEXT
      },
      groupNumber: {
        type: Sequelize.TEXT
      },
      idNumber: {
        type: Sequelize.TEXT
      },
      licenseExpirationDate: {
        type: Sequelize.TEXT
      },
      TWICCardExpirationDate: {
        type: Sequelize.TEXT
      },
      hazmatEndorsementExpirationDate: {
        type: Sequelize.TEXT
      },
      DOTMedicalCardExpirationDate: {
        type: Sequelize.TEXT
      },
      insuranceExpirationDate: {
        type: Sequelize.TEXT
      },
      lastRoadTestDate: {
        type: Sequelize.TEXT
      },
      lastDrugTestDate: {
        type: Sequelize.TEXT
      },
      lastAlcoholTestDate: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('drivers');
  }
};