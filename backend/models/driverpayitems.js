'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class driverPayItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  driverPayItems.init({
    userId: DataTypes.INTEGER,
    rateBasis: DataTypes.STRING,
    description: DataTypes.STRING,
    drivers: DataTypes.STRING,
    adjustment: DataTypes.STRING,
    rate: DataTypes.STRING,
    notes: DataTypes.STRING,
    dateRange: DataTypes.STRING,
    isAutoAddToLoad: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'driverPayItems',
  });
  return driverPayItems;
};