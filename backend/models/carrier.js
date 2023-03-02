'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carrier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  carrier.init({
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    street1: DataTypes.STRING,
    street2: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    telephone: DataTypes.STRING,
    checksPayableTo: DataTypes.STRING,
    isOKToLoad: DataTypes.STRING,
    privateNotes: DataTypes.STRING,
    MCFFMXNumber: DataTypes.STRING,
    USDOTNumber: DataTypes.STRING,
    taxIDNumber: DataTypes.STRING,
    is1099Vendor: DataTypes.STRING,
    paymentTerms: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    primaryInsuranceDetails: DataTypes.STRING,
    primaryInsuranceExpirationDate: DataTypes.STRING,
    cargoInsuranceDetails: DataTypes.STRING,
    cargoInsuranceExpirationDate: DataTypes.STRING,
    weightUnit: DataTypes.STRING,
    distanceUnit: DataTypes.STRING,
    temperatureUnit: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'carrier',
  });
  return carrier;
};