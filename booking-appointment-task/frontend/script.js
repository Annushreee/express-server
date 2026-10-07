const form = document.querySelector("#appointmentForm");
const userList = document.querySelector("#userList");


// ===============================
// Add User
// ===============================

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;
    const email = document.querySelector("#email").value;

    try {
        const response = await fetch("/user/add-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                phone,
                email
            })
        });

        const data = await response.json();

        console.log(data);

        form.reset();

        getUsers();

    } catch (error) {
        console.error("Error adding user:", error);
    }
});


// ===============================
// Get Users
// ===============================

const getUsers = async () => {
    try {
        const response = await fetch("/user/get-users");

        const users = await response.json();

        userList.innerHTML = "";

        users.forEach((user) => {

            const li = document.createElement("li");

            li.innerHTML = `
                <span>
                    ${user.name} - 
                    ${user.phone} - 
                    ${user.email}
                </span>

                <button onclick="deleteUser(${user.id})">
                    Delete
                </button>
            `;

            userList.appendChild(li);
        });

    } catch (error) {
        console.error("Error getting users:", error);
    }
};


// ===============================
// Delete User
// ===============================

const deleteUser = async (id) => {
    try {
        const response = await fetch(`/user/delete-user/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        console.log(data);

        getUsers();

    } catch (error) {
        console.error("Error deleting user:", error);
    }
};


// Load users when page opens
getUsers();