'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loadDocuments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      loadId: {
        type: Sequelize.INTEGER
      },
      documentName: {
        type: Sequelize.STRING
      }, 
      documentType: {
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
    await queryInterface.dropTable('loadDocuments');
  }
};