const express = require("express");

const app = express();

const PORT = 4000;

app.use(express.json());

const bookRouter = require("./routes/bookRoutes");

app.use("/books", bookRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});