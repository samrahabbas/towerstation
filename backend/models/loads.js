'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class loads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  loads.init({
    userId: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    DHO: DataTypes.STRING,
    DHD: DataTypes.STRING,
    destination: DataTypes.STRING,
    company: DataTypes.STRING,
    contact: DataTypes.STRING,
    offer: DataTypes.STRING,
    truckTypeGroup: DataTypes.STRING,
    truckTypes: DataTypes.STRING,
    // truckTypes: DataTypes.ARRAY(DataTypes.STRING),
    loadType:DataTypes.STRING,
    lookBackHours: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    age: DataTypes.STRING,
    pickup: DataTypes.STRING,
    weight: DataTypes.STRING,
    trip: DataTypes.STRING,
    eq: DataTypes.STRING,
    length: DataTypes.STRING,
    factor: DataTypes.STRING,
    cs: DataTypes.STRING,



  }, {
    sequelize,
    modelName: 'loads',
  });
  return loads;
};