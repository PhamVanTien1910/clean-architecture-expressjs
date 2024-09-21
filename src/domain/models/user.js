'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    sex: DataTypes.STRING,
    password:DataTypes.STRING,
    address: DataTypes.STRING,
    roleId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};