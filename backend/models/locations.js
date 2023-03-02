'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  locations.init({
    userId: DataTypes.INTEGER,
    street1: DataTypes.STRING,
    street2: DataTypes.STRING,
    city:  DataTypes.STRING,
    state:  DataTypes.STRING,
    zipCode:  DataTypes.STRING,
    telephone:  DataTypes.STRING,
    privateNotes: DataTypes.STRING,
    locationTypes: DataTypes.STRING,
    locationCodes: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'locations',
  });
  return locations;
};