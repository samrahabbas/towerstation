'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trailers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  trailers.init({
    userId: DataTypes.INTEGER,
    model: DataTypes.STRING,
    trailerNumber: DataTypes.STRING,
    trailerType: DataTypes.STRING,
    generatorInfo: DataTypes.STRING,
    licensePlate: DataTypes.STRING,
    modelYear: DataTypes.STRING,
    vehicleIdNumber: DataTypes.STRING,
    status: DataTypes.STRING,
    insuranceInformation: DataTypes.STRING,
    length: DataTypes.STRING,
    width: DataTypes.STRING,
    trailerNumber: DataTypes.STRING,
    height: DataTypes.STRING,
    numberOfAxles: DataTypes.STRING,
    unloadedVehicleWeight: DataTypes.STRING,
    grossVehicleWeight: DataTypes.STRING,
    notes: DataTypes.STRING,
    ownership: DataTypes.STRING,
    isPurchased: DataTypes.STRING,
    purchasedFrom: DataTypes.STRING,
    soldTo: DataTypes.STRING,
    purchasedDate: DataTypes.STRING,
    soldDate: DataTypes.STRING,
    purchasedPrice: DataTypes.STRING,
    soldPrice: DataTypes.STRING,
    factoryPrice: DataTypes.STRING,
    currentValue: DataTypes.STRING,
    licensePlateExpiration: DataTypes.STRING,
    DOTExpiration: DataTypes.STRING,
    insuranceExpiration: DataTypes.STRING,
    lastServiceDate: DataTypes.STRING,
    inspectionExpiration: DataTypes.STRING,
    registrationExpiration: DataTypes.STRING,
    estimatedOdometerReading: DataTypes.STRING,
    lastServiceMileage: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'trailers',
  });
  return trailers;
};