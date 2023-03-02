'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carrierContact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  carrierContact.init({
    carrierId: DataTypes.INTEGER,
    contactName: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    fax: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'carrierContact',
  });
  return carrierContact;
};