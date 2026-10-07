const User = require("../models/User");

const addUser = async (req, res) => {
    try {
        const { name, phone, email } = req.body;

        const user = await User.create({
            name,
            phone,
            email
        });

        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({
            message: "Failed to add user",
            error: error.message
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get users",
            error: error.message
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await User.destroy({
            where: {
                id: id
            }
        });

        if (deleted === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete user",
            error: error.message
        });
    }
};

module.exports = {
    addUser,
    getUsers,
    deleteUser
};