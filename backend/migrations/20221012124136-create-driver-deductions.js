'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('driverDeductions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      rateBasis: {
        type: Sequelize.STRING
      },
      description:  {
        type: Sequelize.STRING
      },
      drivers:  {
        type: Sequelize.STRING
      }, 
      adjustment:  {
        type: Sequelize.STRING
      }, 
      rate:  {
        type: Sequelize.STRING
      }, 
      notes:  {
        type: Sequelize.STRING
      }, 
      dateRange:  {
        type: Sequelize.STRING
      }, 
      isAutoAddToLoad:  {
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
    await queryInterface.dropTable('driverDeductions');
  }
};