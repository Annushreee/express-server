const express = require("express");

const router = express.Router();

const students = [
    { id: 1, name: "Anushree" },
    { id: 2, name: "Yash" },
    { id: 3, name: "Kiran" }
];

// GET /students
router.get("/", (req, res) => {
    const names = students.map(student => student.name).join(", ");

    res.send(`Students: ${names}`);
});

// GET /students/:id
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (student) {
        res.send(`Student: ${student.name}`);
    } else {
        res.send("Student not found");
    }
});

module.exports = router;