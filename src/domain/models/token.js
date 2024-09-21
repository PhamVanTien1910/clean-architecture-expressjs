'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Token.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
      },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Token',
    tableName: 'tokens',  // Đặt tên bảng là tokens
    underscored: true,    // Sử dụng kiểu tên trường với dấu gạch dưới
    timestamps: false     // Nếu bạn không muốn Sequelize tự động thêm timestamps (created_at, updated_at)
  });

  return Token;
};
