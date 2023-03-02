'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userDocuments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userDocuments.init({
    userId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    documentName: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'userDocuments',
  });
  return userDocuments;
};