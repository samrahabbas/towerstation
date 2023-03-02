'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customers.init({
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
    cellPhone: DataTypes.STRING,
    fax: DataTypes.STRING,
    email: DataTypes.STRING,
    privateNotes: DataTypes.STRING,
    creditLimit: DataTypes.STRING,
    isCreditHold: DataTypes.STRING,
    availableCredit: DataTypes.STRING,
    paymentTerms: DataTypes.STRING,
    mcNumberType: DataTypes.STRING,
    mcNumber: DataTypes.STRING,
    usdotNumber: DataTypes.STRING,
    weightUnit: DataTypes.STRING,
    distanceUnit: DataTypes.STRING,
    temperatureUnit: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'customers',
  });
  return customers;
};