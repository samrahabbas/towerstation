'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shipper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shipper.init({
    userId: DataTypes.INTEGER,
    companyName: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    address: DataTypes.STRING,
    cellPhone: DataTypes.STRING,
    entityType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'shipper',
  });
  return shipper;
};