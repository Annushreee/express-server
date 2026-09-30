const getAllUsers = (req, res, next) => {
    try {
        res.send("Fetching all users");
    } catch (error) {
        next(error);
    }
};

const addUser = (req, res, next) => {
    try {
        res.send("Adding a new user");
    } catch (error) {
        next(error);
    }
};

const getUserById = (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            const error = new Error("User ID is required");
            error.statusCode = 400;
            throw error;
        }

        res.send(`Fetching user with ID: ${id}`);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    addUser,
    getUserById
};