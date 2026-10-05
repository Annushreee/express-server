const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

const PORT = 5001;

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
            console.error("Insertion failed:", err.message);

            return res.status(500).json({
                message: "Failed to insert user"
            });
        }

        console.log(
            `User inserted: ID=${result.insertId}, Name=${name}, Email=${email}`
        );

        res.status(201).json({
            message: "User created successfully",
            userId: result.insertId
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});