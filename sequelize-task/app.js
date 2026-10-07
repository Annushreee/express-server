const sequelize = require("./db");
const User = require("./User");

const startApp = async () => {
    try {
        await sequelize.authenticate();

        console.log("Database connected successfully!");

        await sequelize.sync();

        console.log("User table created successfully!");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

startApp();