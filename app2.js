const express = require("express");

const app = express();

const PORT = 4000;


// Dynamic route
app.get("/welcome/:username", (req, res) => {

    const username = req.params.username;
    const role = req.query.role;

    res.send(`Welcome ${username}, your role is ${role}`);
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});