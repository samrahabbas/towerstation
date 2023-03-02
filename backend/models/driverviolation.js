'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class driverViolation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  driverViolation.init({
    userId: DataTypes.INTEGER,
    driverId: DataTypes.INTEGER,
    violationType: DataTypes.STRING,
    date:DataTypes.STRING,
    violationDescription:DataTypes.STRING,
    authority:DataTypes.STRING,
    location:DataTypes.STRING,
    fineAmount:DataTypes.STRING,
    notes:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'driverViolation',
  });
  return driverViolation;
};