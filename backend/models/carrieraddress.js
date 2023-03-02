'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carrierAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  carrierAddress.init({
    carrierId: DataTypes.INTEGER,
    factoringName: DataTypes.STRING,
    factoringChecksPayableTo: DataTypes.STRING,
    factoringStreet1: DataTypes.STRING,
    factoringStreet2: DataTypes.STRING,
    factoringCity: DataTypes.STRING,
    factoringState: DataTypes.STRING,
    factoringZipCode: DataTypes.STRING,
    factoringTelephone: DataTypes.STRING,
    remitChecksPayableTo: DataTypes.STRING,
    remitStreet1: DataTypes.STRING,
    remitStreet2: DataTypes.STRING,
    remitCity: DataTypes.STRING,
    remitState: DataTypes.STRING,
    remitZipCode: DataTypes.STRING,
    remitTelephone: DataTypes.STRING,
    mailingStreet1: DataTypes.STRING,
    mailingStreet2: DataTypes.STRING,
    mailingCity: DataTypes.STRING,
    mailingState: DataTypes.STRING,
    mailingZipCode: DataTypes.STRING,
    mailingTelephone: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'carrierAddress',
  });
  return carrierAddress;
};