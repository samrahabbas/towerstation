'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class signedDocuments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  signedDocuments.init({
    createdBy: DataTypes.INTEGER,
    file: DataTypes.STRING,
    role: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'signedDocuments',
  });
  return signedDocuments;
};