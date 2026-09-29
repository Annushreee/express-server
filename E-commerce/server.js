const express = require("express");

const app = express();

const PORT = 5000;

// Import routers
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");

// Connect routers
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start server
app.listen(PORT, () => {
    console.log(`E-Commerce API running on http://localhost:${PORT}`);
});