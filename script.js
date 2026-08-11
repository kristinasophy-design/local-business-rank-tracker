const button = document.getElementById("startButton");
const businessInput = document.getElementById("businessName");
const keywordInput = document.getElementById("keyword");
const results = document.getElementById("results");
const businessList = document.getElementById("businessList");

// Keep track of whether we are editing a business
let editingIndex = null;

// Load saved businesses
const savedBusinesses = localStorage.getItem("businesses");

const businesses = savedBusinesses
    ? JSON.parse(savedBusinesses)
    : [];

// Display all businesses
function displayBusinesses() {

    businessList.innerHTML = "";

    businesses.forEach(function(business, index) {

        businessList.innerHTML += `
            <div class="business-item">

                <h3>${business.name}</h3>

                <p>${business.keyword}</p>

                <button
                    class="edit-button"
                    data-index="${index}">
                    Edit
                </button>

                <button
                    class="delete-button"
                    data-index="${index}">
                    Delete
                </button>

            </div>
        `;

    });
}

// Start tracking / update business
button.addEventListener("click", function() {

    const businessName = businessInput.value.trim();
    const keyword = keywordInput.value.trim();

    // Validate input
    if (businessName === "" || keyword === "") {

        results.innerHTML = `
            <p>Please enter your business name and keyword.</p>
        `;

        return;
    }

    // If editing an existing business
    if (editingIndex !== null) {

        businesses[editingIndex] = {
            name: businessName,
            keyword: keyword
        };

        editingIndex = null;

        button.textContent = "Start Tracking";

        results.innerHTML = `
            <h2>Business Updated</h2>

            <p><strong>Business:</strong> ${businessName}</p>

            <p><strong>Keyword:</strong> ${keyword}</p>
        `;

    } else {

        // Create a new business
        const business = {
            name: businessName,
            keyword: keyword
        };

        businesses.push(business);

        results.innerHTML = `
            <h2>Tracking Started</h2>

            <p><strong>Business:</strong> ${business.name}</p>

            <p><strong>Keyword:</strong> ${business.keyword}</p>

            <p>Total businesses being tracked: ${businesses.length}</p>
        `;
    }

    // Save changes
    localStorage.setItem(
        "businesses",
        JSON.stringify(businesses)
    );

    // Update list
    displayBusinesses();

    // Clear form
    businessInput.value = "";
    keywordInput.value = "";

});

// Handle Edit and Delete buttons
businessList.addEventListener("click", function(event) {

    // EDIT
    if (event.target.classList.contains("edit-button")) {

        const index = event.target.dataset.index;

        const business = businesses[index];

        businessInput.value = business.name;
        keywordInput.value = business.keyword;

        editingIndex = Number(index);

        button.textContent = "Update Business";

        results.innerHTML = `
            <h2>Editing Business</h2>

            <p>Make your changes and click Update Business.</p>
        `;
    }

    // DELETE
    if (event.target.classList.contains("delete-button")) {

        const index = event.target.dataset.index;

        businesses.splice(index, 1);

        localStorage.setItem(
            "businesses",
            JSON.stringify(businesses)
        );

        displayBusinesses();

        results.innerHTML = `
            <p>Business deleted successfully.</p>
        `;
    }

});

// Display saved businesses when page loads
displayBusinesses();