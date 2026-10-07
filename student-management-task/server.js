const express = require("express");
const db = require("./db");

const app = express();

const PORT = 5003;

app.use(express.json());


// POST /students
// Insert a new student
app.post("/students", (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
        return res.status(400).json({
            message: "Name, email and age are required"
        });
    }

    const sql = `
        INSERT INTO students (name, email, age)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, age], (err, result) => {
        if (err) {
            console.error("Insert error:", err.message);

            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }

            return res.status(500).json({
                message: "Failed to insert student"
            });
        }

        console.log(
            `Student inserted: ID=${result.insertId}, Name=${name}`
        );

        res.status(201).json({
            message: "Student added successfully",
            studentId: result.insertId
        });
    });
});


// GET /students
// Retrieve all students
app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Retrieve error:", err.message);

            return res.status(500).json({
                message: "Failed to retrieve students"
            });
        }

        res.json(results);
    });
});


// GET /students/:id
// Retrieve one student
app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "Student ID must be a number"
        });
    }

    const sql = "SELECT * FROM students WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Retrieve error:", err.message);

            return res.status(500).json({
                message: "Failed to retrieve student"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(results[0]);
    });
});


// PUT /students/:id
// Update student
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, email, age } = req.body;

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "Student ID must be a number"
        });
    }

    if (!name || !email || age === undefined) {
        return res.status(400).json({
            message: "Name, email and age are required"
        });
    }

    const sql = `
        UPDATE students
        SET name = ?, email = ?, age = ?
        WHERE id = ?
    `;

    db.query(sql, [name, email, age, id], (err, result) => {
        if (err) {
            console.error("Update error:", err.message);

            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }

            return res.status(500).json({
                message: "Failed to update student"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        console.log(
            `Student updated: ID=${id}, Name=${name}`
        );

        res.json({
            message: "Student updated successfully"
        });
    });
});


// DELETE /students/:id
// Delete student
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "Student ID must be a number"
        });
    }

    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Delete error:", err.message);

            return res.status(500).json({
                message: "Failed to delete student"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        console.log(`Student deleted: ID=${id}`);

        res.json({
            message: "Student deleted successfully"
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});