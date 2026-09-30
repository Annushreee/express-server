const getAllProducts = (req, res, next) => {
    try {
        res.send("Fetching all products");
    } catch (error) {
        next(error);
    }
};

const addProduct = (req, res, next) => {
    try {
        res.send("Adding a new product");
    } catch (error) {
        next(error);
    }
};

const getProductById = (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            const error = new Error("Product ID is required");
            error.statusCode = 400;
            throw error;
        }

        res.send(`Fetching product with ID: ${id}`);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    getProductById
};