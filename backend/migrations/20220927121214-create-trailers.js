'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trailers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      model: {
        type: Sequelize.TEXT
      },
      trailerNumber: {
        type: Sequelize.TEXT
      },
      trailerType: {
        type: Sequelize.TEXT
      },
      generatorInfo: {
        type: Sequelize.TEXT
      },
      licensePlate: {
        type: Sequelize.TEXT
      },
      modelYear: {
        type: Sequelize.TEXT
      },
      vehicleIdNumber: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.TEXT
      },
      insuranceInformation: {
        type: Sequelize.TEXT
      },
      length: {
        type: Sequelize.TEXT
      },
      width: {
        type: Sequelize.TEXT
      },
      trailerNumber: {
        type: Sequelize.TEXT
      },
      height: {
        type: Sequelize.TEXT
      },
      numberOfAxles: {
        type: Sequelize.TEXT
      },
      unloadedVehicleWeight: {
        type: Sequelize.TEXT
      },
      grossVehicleWeight: {
        type: Sequelize.TEXT
      },
      notes: {
        type: Sequelize.TEXT
      },
      ownership: {
        type: Sequelize.TEXT
      },
      isPurchased: {
        type: Sequelize.TEXT
      },
      purchasedFrom: {
        type: Sequelize.TEXT
      },
      soldTo: {
        type: Sequelize.TEXT
      },
      purchasedDate: {
        type: Sequelize.TEXT
      },
      soldDate: {
        type: Sequelize.TEXT
      },
      purchasedPrice: {
        type: Sequelize.TEXT
      },
      soldPrice: {
        type: Sequelize.TEXT
      },
      factoryPrice: {
        type: Sequelize.TEXT
      },
      currentValue: {
        type: Sequelize.TEXT
      },
      licensePlateExpiration: {
        type: Sequelize.TEXT
      },
      DOTExpiration: {
        type: Sequelize.TEXT
      },
      insuranceExpiration: {
        type: Sequelize.TEXT
      },
      lastServiceDate: {
        type: Sequelize.TEXT
      },
      inspectionExpiration: {
        type: Sequelize.TEXT
      },
      registrationExpiration: {
        type: Sequelize.TEXT
      },
      estimatedOdometerReading: {
        type: Sequelize.TEXT
      },
      lastServiceMileage: {
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
    await queryInterface.dropTable('trailers');
  }
};