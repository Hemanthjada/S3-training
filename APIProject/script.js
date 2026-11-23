
const userContainer = document.getElementById("userContainer");
const statusText = document.getElementById("status");
const refreshBtn = document.getElementById("refreshBtn");

// Fetch users from API
async function fetchUsers() {

    // Show loading message
    statusText.textContent = "Loading users...";
    userContainer.innerHTML = "";
    refreshBtn.disabled = true;

    try {

        // Fetch API data
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        // Check API response
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        // Convert JSON into JavaScript objects
        const users = await response.json();

        // Display users
        displayUsers(users);

        statusText.textContent =
            `Successfully loaded ${users.length} users`;

    }
    catch (error) {

        statusText.textContent =
            "Something went wrong: " + error.message;

    }
    finally {

        // Enable refresh button
        refreshBtn.disabled = false;

    }
}

// Display users as cards
function displayUsers(users) {

    userContainer.innerHTML = "";

    users.forEach(function(user) {

        const card = document.createElement("div");
        card.className = "user-card";

        card.innerHTML = `
            <h3>${user.name}</h3>

            <p><strong>Email:</strong> ${user.email}</p>

            <p><strong>Phone:</strong> ${user.phone}</p>

            <p><strong>Company:</strong> ${user.company.name}</p>

            <p><strong>City:</strong> ${user.address.city}</p>
        `;

        userContainer.appendChild(card);

    });
}

// Refresh button event
refreshBtn.addEventListener("click", fetchUsers);

// Load users when page opens
fetchUsers();
