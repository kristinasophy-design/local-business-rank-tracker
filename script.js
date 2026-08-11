const button = document.getElementById("startButton");
const businessInput = document.getElementById("businessName");
const keywordInput = document.getElementById("keyword");
const results = document.getElementById("results");
const businessList = document.getElementById("businessList");

// Load saved businesses from localStorage
const savedBusinesses = localStorage.getItem("businesses");

const businesses = savedBusinesses
    ? JSON.parse(savedBusinesses)
    : [];

// Display all businesses
function displayBusinesses() {

    businessList.innerHTML = "";

    businesses.forEach(function(business) {

        businessList.innerHTML += `
            <div class="business-item">
                <h3>${business.name}</h3>
                <p>${business.keyword}</p>
            </div>
        `;

    });
}

// Start tracking button
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

    // Create a business object
    const business = {
        name: businessName,
        keyword: keyword
    };

    // Add business to the array
    businesses.push(business);

    // Save businesses to localStorage
    localStorage.setItem(
        "businesses",
        JSON.stringify(businesses)
    );

    // Show confirmation
    results.innerHTML = `
        <h2>Tracking Started</h2>

        <p><strong>Business:</strong> ${business.name}</p>

        <p><strong>Keyword:</strong> ${business.keyword}</p>

        <p>Total businesses being tracked: ${businesses.length}</p>
    `;

    // Update business list
    displayBusinesses();

    // Clear the input fields
    businessInput.value = "";
    keywordInput.value = "";

});

// Display saved businesses when the page loads
displayBusinesses();