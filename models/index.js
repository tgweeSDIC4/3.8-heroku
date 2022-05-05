// Import sequelize
// const { Sequelize } = require("sequelize");
// DB Connection Configuration
// const sequelize = new Sequelize('sqlite::memory:');

// Import model(s)
const {sequelize,User} = require("./users.model");

// Test connection function
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
}

module.exports = {
  testConnection,
  User,
};
