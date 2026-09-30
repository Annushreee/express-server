const express = require("express");
const path = require("path");

const app = express();

const PORT = 5000;

// Allows Express to read JSON data
app.use(express.json());

// GET request - serve HTML file
app.get("/api/products", (req, res) => {
    const filePath = path.join(__dirname, "VIEW", "products.html");

    res.sendFile(filePath);
});

// POST request - receive product
app.post("/api/products", (req, res) => {
    const product = req.body;

    console.log("Product received:", product);

    res.send(`Product added: ${product.productName}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});