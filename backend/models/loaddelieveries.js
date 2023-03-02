'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class loadDelieveries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  loadDelieveries.init({
    userId: DataTypes.INTEGER,
    loadId: DataTypes.STRING,
    status: DataTypes.STRING,
    pickupDate:  DataTypes.STRING,
    dropDate:  DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'loadDelieveries',
  });
  return loadDelieveries;
};