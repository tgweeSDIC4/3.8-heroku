const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = new Sequelize('sqlite::memory:');

  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "email",
      },
      pwdHashed: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "pwdHashed",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "users",
    }
  );

  //create table if it does not exists
User.sync();

module.exports={
  sequelize,
  User,
};