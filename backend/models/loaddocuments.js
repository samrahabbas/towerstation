'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class loadDocuments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  loadDocuments.init({
    userId: DataTypes.INTEGER,
    loadId: DataTypes.INTEGER,
    documentName: DataTypes.STRING,
    documentType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'loadDocuments',
  });
  return loadDocuments;
};