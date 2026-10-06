const express = require("express");
const db = require("./db");

const app = express();

const PORT = 5002;

app.use(express.json());


// POST /users
// Add a new user
app.post("/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const sql = "INSERT INTO Users (name, email) VALUES (?, ?)";

    db.query(sql, [name, email], (err, result) => {
        if (err) {
            console.error("Error inserting user:", err.message);

            return res.status(500).json({
                message: "Failed to add user"
            });
        }

        console.log(`User inserted successfully. ID: ${result.insertId}`);

        res.status(201).json({
            message: "User added successfully",
            userId: result.insertId
        });
    });
});


// GET /users
// Retrieve all users
app.get("/users", (req, res) => {
    const sql = "SELECT * FROM Users";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error retrieving users:", err.message);

            return res.status(500).json({
                message: "Failed to retrieve users"
            });
        }

        console.log("Users retrieved successfully");

        res.json(results);
    });
});


// POST /buses
// Add a new bus
app.post("/buses", (req, res) => {
    const { busNumber, totalSeats, availableSeats } = req.body;

    if (!busNumber || !totalSeats || availableSeats === undefined) {
        return res.status(400).json({
            message: "busNumber, totalSeats and availableSeats are required"
        });
    }

    const sql = `
        INSERT INTO Buses
        (busNumber, totalSeats, availableSeats)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [busNumber, totalSeats, availableSeats],
        (err, result) => {
            if (err) {
                console.error("Error inserting bus:", err.message);

                return res.status(500).json({
                    message: "Failed to add bus"
                });
            }

            console.log(`Bus inserted successfully. ID: ${result.insertId}`);

            res.status(201).json({
                message: "Bus added successfully",
                busId: result.insertId
            });
        }
    );
});


// GET /buses/available/:seats
// Retrieve buses having more than specified available seats
app.get("/buses/available/:seats", (req, res) => {
    const seats = Number(req.params.seats);

    if (Number.isNaN(seats)) {
        return res.status(400).json({
            message: "Seats must be a number"
        });
    }

    const sql = `
        SELECT * FROM Buses
        WHERE availableSeats > ?
    `;

    db.query(sql, [seats], (err, results) => {
        if (err) {
            console.error("Error retrieving buses:", err.message);

            return res.status(500).json({
                message: "Failed to retrieve buses"
            });
        }

        console.log(
            `Buses with more than ${seats} available seats retrieved`
        );

        res.json(results);
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});