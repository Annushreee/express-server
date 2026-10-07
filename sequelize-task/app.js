const sequelize = require("./db");
const User = require("./User");

const startApp = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully!");

        await sequelize.sync();
        console.log("User table is ready!");

        // INSERT
        const user = await User.create({
            name: "Rahul Sharma",
            email: "rahul@example.com"
        });

        console.log("Inserted user:", user.toJSON());

        // READ - findAll
        const users = await User.findAll();
        console.log("All users:", users.map(user => user.toJSON()));

        // READ - findByPk
        const foundUser = await User.findByPk(user.id);
        console.log("User found by ID:", foundUser.toJSON());

        // UPDATE
        await User.update(
            {
                name: "Rahul Updated",
                email: "rahul.updated@example.com"
            },
            {
                where: {
                    id: user.id
                }
            }
        );

        console.log("User updated successfully!");

        // DELETE
        await User.destroy({
            where: {
                id: user.id
            }
        });

        console.log("User deleted successfully!");

    } catch (error) {
        console.error("Error:", error.message);
    }
};

startApp();