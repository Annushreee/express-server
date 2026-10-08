const express = require("express");
const sequelize = require("./db");

const User = require("./User");
const Bus = require("./Bus");
const Booking = require("./Booking");
const Payment = require("./Payment");

const app = express();

const PORT = 5004;

app.use(express.json());


// ===============================
// Associations
// ===============================

// One User can have many Bookings
User.hasMany(Booking, {
    foreignKey: "userId"
});

Booking.belongsTo(User, {
    foreignKey: "userId"
});


// One Bus can have many Bookings
Bus.hasMany(Booking, {
    foreignKey: "busId"
});

Booking.belongsTo(Bus, {
    foreignKey: "busId"
});


// ===============================
// Start Server
// ===============================

const startServer = async () => {
    try {

        await sequelize.authenticate();

        console.log("Connected to MySQL using Sequelize!");

        // Update existing tables
        await sequelize.sync({ alter: true });

        console.log("All tables are ready!");

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