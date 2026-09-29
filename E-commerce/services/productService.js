const getAllProducts = () => {
    return "Fetching all products";
};

const addProduct = () => {
    return "Adding a new product";
};

const getProductById = (id) => {
    return `Fetching product with ID: ${id}`;
};

module.exports = {
    getAllProducts,
    addProduct,
    getProductById
};