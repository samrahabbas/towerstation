'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      street1: {
        type: Sequelize.STRING
      },
      street2: {
        type: Sequelize.STRING
      },
      city:  {
        type: Sequelize.STRING
      },
      state:  {
        type: Sequelize.STRING
      },
      zipCode:  {
        type: Sequelize.STRING
      },
      telephone:  {
        type: Sequelize.STRING
      },
      privateNotes: {
        type: Sequelize.STRING
      },
      locationTypes: {
        type: Sequelize.STRING
      },
      locationCodes: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('locations');
  }
};