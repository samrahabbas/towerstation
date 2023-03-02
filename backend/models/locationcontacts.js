'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class locationContacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  locationContacts.init({
    locationId: DataTypes.INTEGER,
    contactName: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    fax: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'locationContacts',
  });
  return locationContacts;
};