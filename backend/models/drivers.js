'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drivers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  drivers.init({
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    street1: DataTypes.STRING,
    street2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    cellPhone: DataTypes.STRING,
    email: DataTypes.STRING,
    driverType: DataTypes.STRING,
    status: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    driverNumber: DataTypes.STRING,
    ownershipType: DataTypes.STRING,
    weightUnit: DataTypes.STRING,
    distanceUnit: DataTypes.STRING,
    temperatureUnit: DataTypes.STRING,
    notes: DataTypes.STRING,
    commercialDriverSinceYear: DataTypes.STRING,
    experienceType: DataTypes.STRING,
    drivingSchool: DataTypes.STRING,
    CDLNumber: DataTypes.STRING,
    licenseType: DataTypes.STRING,
    licenseEndorsements: DataTypes.STRING,
    applicationDate: DataTypes.STRING,
    hireDate: DataTypes.STRING,
    terminationDate: DataTypes.STRING,
    canHireAgain: DataTypes.STRING,
    bonusEligibilityDate: DataTypes.STRING,
    employmentNotes: DataTypes.STRING,
    insuranceCompany: DataTypes.STRING,
    groupNumber: DataTypes.STRING,
    idNumber: DataTypes.STRING,
    licenseExpirationDate: DataTypes.STRING,
    TWICCardExpirationDate: DataTypes.STRING,
    hazmatEndorsementExpirationDate: DataTypes.STRING,
    DOTMedicalCardExpirationDate: DataTypes.STRING,
    insuranceExpirationDate: DataTypes.STRING,
    lastRoadTestDate: DataTypes.STRING,
    lastDrugTestDate: DataTypes.STRING,
    lastAlcoholTestDate: DataTypes.STRING,



  }, {
    sequelize,
    modelName: 'drivers',
  });
  return drivers;
};