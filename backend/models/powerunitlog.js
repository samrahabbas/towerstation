'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class powerUnitLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  powerUnitLog.init({
    userId: DataTypes.INTEGER,
    mileage: DataTypes.STRING,
    date:DataTypes.STRING,
    maintenanceType:DataTypes.STRING,
    maintenancePerformed:DataTypes.STRING,
    performedBy:DataTypes.STRING,
    location:DataTypes.STRING,
    billTo:DataTypes.STRING,
    amount:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'powerUnitLog',
  });
  return powerUnitLog;
};