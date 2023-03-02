'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rolesPermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rolesPermissions.init({
    roleId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER,
    privilegeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rolesPermissions',
  });
  return rolesPermissions;
};