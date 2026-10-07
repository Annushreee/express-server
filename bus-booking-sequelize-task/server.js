const express = require("express");
const sequelize = require("./db");

const User = require("./User");
const Bus = require("./Bus");
const Booking = require("./Booking");
const Payment = require("./Payment");

const app = express();

const PORT = 5004;

// Middleware
app.use(express.json());


// ===============================
// POST /users - Create User
// ===============================

app.post("/users", async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.create({
            name,
            email
        });

        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create user",
            error: error.message
        });
    }
});


// ===============================
// Start Server
// ===============================

const startServer = async () => {
    try {

        // Connect to MySQL
        await sequelize.authenticate();

        console.log("Connected to MySQL using Sequelize!");

        // Sync tables
        await sequelize.sync();

        console.log("All tables are ready!");


        // ===============================
        // Insert 3 Users
        // ===============================

        await User.create({
            name: "Rahul Sharma",
            email: "rahul@example.com"
        });

        await User.create({
            name: "Priya Singh",
            email: "priya@example.com"
        });

        await User.create({
            name: "Amit Kumar",
            email: "amit@example.com"
        });

        console.log("3 users inserted successfully!");


        // ===============================
        // Insert 2 Buses
        // ===============================

        await Bus.create({
            busNumber: "KA01AB1234",
            totalSeats: 40,
            availableSeats: 25
        });

        await Bus.create({
            busNumber: "KA02CD5678",
            totalSeats: 50,
            availableSeats: 8
        });

        console.log("2 buses inserted successfully!");


        // ===============================
        // Start Express Server
        // ===============================

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error(
            "Database operation failed:",
            error.message
        );
    }
};

startServer();