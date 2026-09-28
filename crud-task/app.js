const express = require("express");

const app = express();

const PORT = 5000;

// Import routers
const studentRouter = require("./routes/studentRoutes");
const courseRouter = require("./routes/courseRoutes");

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to the Student & Course Portal API!");
});

// Connect routers
app.use("/students", studentRouter);
app.use("/courses", courseRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});