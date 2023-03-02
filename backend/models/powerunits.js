'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class powerUnits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  powerUnits.init({
    userId: DataTypes.INTEGER,
    model: DataTypes.STRING,
    powerUnitNumber: DataTypes.STRING,
    engineType: DataTypes.STRING,
    transmissionType: DataTypes.STRING,
    fuelType: DataTypes.STRING,
    horsepower: DataTypes.STRING,
    licensePlate: DataTypes.STRING,
    modelYear: DataTypes.STRING,
    vehicleIdNumber: DataTypes.STRING,
    status: DataTypes.STRING,
    insuranceInformation: DataTypes.STRING,
    registeredStates: DataTypes.STRING,
    length: DataTypes.STRING,
    width: DataTypes.STRING,
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
    inspectionExpiration: DataTypes.STRING,
    DOTExpiration: DataTypes.STRING,
    registrationExpiration: DataTypes.STRING,
    insuranceExpiration: DataTypes.STRING,
    estimatedOdometerReading: DataTypes.STRING,
    lastOilChangeDate: DataTypes.STRING,
    lastOilChangeMileage: DataTypes.STRING,
    lastTuneUpDate: DataTypes.STRING,
    lastTuneUpMileage: DataTypes.STRING,
    lastServiceDate: DataTypes.STRING,
    lastServiceMileage: DataTypes.STRING,
    keepTruckInVehicleId: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'powerUnits',
  });
  return powerUnits;
};