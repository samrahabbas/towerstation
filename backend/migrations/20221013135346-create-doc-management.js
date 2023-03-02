'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('docManagements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      entities: {
        type: Sequelize.STRING
      },
      documentName: {
        type: Sequelize.STRING
      },
      documentTypes: {
        type: Sequelize.STRING
      },
      documentDescription: {
        type: Sequelize.STRING
      },
      isCompanyDocument: {
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
    await queryInterface.dropTable('docManagements');
  }
};