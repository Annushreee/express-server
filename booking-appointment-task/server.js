const express = require("express");
const path = require("path");
const sequelize = require("./db");

const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");

const app = express();

const PORT = 5005;

app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend")));

app.use("/user", userRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log("Connected to MySQL using Sequelize!");

        await sequelize.sync();

        console.log("User table is ready!");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

startServer();