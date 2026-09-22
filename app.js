const express = require("express");

const app = express();

const PORT = 3000;


// Custom Middleware
const userMiddleware = (req, res, next) => {
    req.user = "Guest";
    next();
};


// Welcome Route
app.get("/welcome", userMiddleware, (req, res) => {
    res.send(`<h1>Welcome, ${req.user}!</h1>`);
});


// Start Server
app.listen(PORT, () => {
    console.log(
        "Server is up and running on port 3000! Ready to handle requests."
    );
});