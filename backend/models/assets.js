'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  assets.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    driver: DataTypes.STRING,
    driverPhone: DataTypes.STRING,
    driverEmail: DataTypes.STRING,
    powerUnit: DataTypes.STRING,
    powerUnitModel: DataTypes.STRING,
    powerUnitLicensePlate: DataTypes.STRING,
    trailer: DataTypes.STRING,
    trailerModel: DataTypes.STRING,
    trailerType: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'assets',
  });
  return assets;
};