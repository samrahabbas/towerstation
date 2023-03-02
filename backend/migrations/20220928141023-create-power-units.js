'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('powerUnits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      model:  {
        type: Sequelize.TEXT
      },
      powerUnitNumber:  {
        type: Sequelize.TEXT
      },
      engineType:  {
        type: Sequelize.TEXT
      },
      transmissionType:  {
        type: Sequelize.TEXT
      },
      fuelType:  {
        type: Sequelize.TEXT
      },
      horsepower:  {
        type: Sequelize.TEXT
      },
      licensePlate:  {
        type: Sequelize.TEXT
      },
      modelYear:  {
        type: Sequelize.TEXT
      },
      vehicleIdNumber:  {
        type: Sequelize.TEXT
      },
      status:  {
        type: Sequelize.TEXT
      },
      insuranceInformation:  {
        type: Sequelize.TEXT
      },
      registeredStates:  {
        type: Sequelize.TEXT
      },
      length:  {
        type: Sequelize.TEXT
      },
      width:  {
        type: Sequelize.TEXT
      },
      height:  {
        type: Sequelize.TEXT
      },
      numberOfAxles:  {
        type: Sequelize.TEXT
      },
      unloadedVehicleWeight:  {
        type: Sequelize.TEXT
      },
      grossVehicleWeight:  {
        type: Sequelize.TEXT
      },
      notes:  {
        type: Sequelize.TEXT
      },
      ownership:  {
        type: Sequelize.TEXT
      },
      isPurchased:  {
        type: Sequelize.TEXT
      },
      purchasedFrom:  {
        type: Sequelize.TEXT
      },
      soldTo:  {
        type: Sequelize.TEXT
      },
      purchasedDate:  {
        type: Sequelize.TEXT
      },
      soldDate:  {
        type: Sequelize.TEXT
      },
      purchasedPrice:  {
        type: Sequelize.TEXT
      },
      soldPrice:  {
        type: Sequelize.TEXT
      },
      factoryPrice:  {
        type: Sequelize.TEXT
      },
      currentValue:  {
        type: Sequelize.TEXT
      },
      licensePlateExpiration:  {
        type: Sequelize.TEXT
      },
      inspectionExpiration:  {
        type: Sequelize.TEXT
      },
      DOTExpiration:  {
        type: Sequelize.TEXT
      },
      registrationExpiration:  {
        type: Sequelize.TEXT
      },
      insuranceExpiration:  {
        type: Sequelize.TEXT
      },
      estimatedOdometerReading:  {
        type: Sequelize.TEXT
      },
      lastOilChangeDate:  {
        type: Sequelize.TEXT
      },
      lastOilChangeMileage:  {
        type: Sequelize.TEXT
      },
      lastTuneUpDate:  {
        type: Sequelize.TEXT
      },
      lastTuneUpMileage:  {
        type: Sequelize.TEXT
      },
      lastServiceDate:  {
        type: Sequelize.TEXT
      },
      lastServiceMileage:  {
        type: Sequelize.TEXT
      },
      keepTruckInVehicleId:  {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('powerUnits');
  }
};