const express = require("express");

const app = express();

const PORT = 5000;

const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.use((req, res) => {
    res.status(404).send("Page not found");
});

app.listen(PORT, () => {
    console.log(`E-Commerce API running on http://localhost:${PORT}`);
});