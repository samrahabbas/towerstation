'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carrierContacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carrierId: {
        type: Sequelize.INTEGER
      },
      contactName: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      fax: {
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
    await queryInterface.dropTable('carrierContacts');
  }
};