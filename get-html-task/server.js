const express = require("express");
const path = require("path");

const app = express();

const PORT = 5000;

app.get("/api/products", (req, res) => {
    const filePath = path.join(__dirname, "VIEW", "products.html");

    res.sendFile(filePath);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});