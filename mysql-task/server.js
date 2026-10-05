const express = require("express");
const db = require("./db");

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Express + MySQL application is running");
});

app.get("/products", (req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }

        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});