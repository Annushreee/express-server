const express = require("express");

const router = express.Router();

const {
    addUser,
    getUsers,   
    deleteUser
} = require("../controllers/userController");

router.post("/add-user", addUser);

router.get("/get-users", getUsers);

router.delete("/delete-user/:id", deleteUser);

module.exports = router;