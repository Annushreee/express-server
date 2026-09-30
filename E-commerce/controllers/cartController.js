const getCartForUser = (req, res, next) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            const error = new Error("User ID is required");
            error.statusCode = 400;
            throw error;
        }

        res.send(`Fetching cart for user with ID: ${userId}`);
    } catch (error) {
        next(error);
    }
};

const addProductToCart = (req, res, next) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            const error = new Error("User ID is required");
            error.statusCode = 400;
            throw error;
        }

        res.send(`Adding product to cart for user with ID: ${userId}`);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCartForUser,
    addProductToCart
};