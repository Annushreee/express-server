const getProducts = (req, res) => {
    res.send("Fetching all products");
};

const addProduct = (req, res) => {
    res.send("Adding a new product");
};

const getProductById = (req, res) => {
    const id = req.params.id;

    res.send(`Fetching product with ID: ${id}`);
};

module.exports = {
    getProducts,
    addProduct,
    getProductById
};