'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class docManagement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  docManagement.init({
    userId: DataTypes.INTEGER,
    entities: DataTypes.STRING,
    documentName: DataTypes.STRING,
    documentTypes: DataTypes.STRING,
    documentDescription: DataTypes.STRING,
    isCompanyDocument: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'docManagement',
  });
  return docManagement;
};