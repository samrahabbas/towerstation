'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class signedDocumentsUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  signedDocumentsUsers.init({
    signedBy: DataTypes.INTEGER,
    file: DataTypes.STRING,
    documentId: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'signedDocumentsUsers',
  });
  return signedDocumentsUsers;
};