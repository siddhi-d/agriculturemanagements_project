document.addEventListener("DOMContentLoaded", async function () {
    await fetchFarms(); // Load farms when the page loads
});

// ✅ Function to Fetch and Display Farms
async function fetchFarms() {
    try {
        const response = await fetch("http://localhost:5000/api/farms");
        const farms = await response.json();

        let farmContainer = document.querySelector(".farm-container");
        farmContainer.innerHTML = ""; // Clear previous content

        farms.forEach(farm => {
            farmContainer.innerHTML += `
                <div class="card p-3 mb-3 shadow">
                    <h5>${farm.name}</h5>
                    <p><strong>Location:</strong> ${farm.location}</p>
                    <p><strong>Crops:</strong> ${farm.crops.join(", ")}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error("❌ Error fetching farms:", error);
    }
}

// ✅ Function to Handle Form Submission
document.getElementById("farmForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form values
    let farmName = document.getElementById("farmName").value;
    let farmLocation = document.getElementById("farmLocation").value;
    let farmCrops = document.getElementById("farmCrops").value.split(",").map(crop => crop.trim());

    const farmData = {
        name: farmName,
        location: farmLocation,
        crops: farmCrops
    };

    try {
        const response = await fetch("http://localhost:5000/api/farms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(farmData)
        });

        if (!response.ok) {
            throw new Error("Failed to add farm");
        }

        alert("✅ Farm added successfully!");
        document.getElementById("farmForm").reset(); // Reset form
        await fetchFarms(); // Refresh farm list
    } catch (error) {
        console.error("❌ Error adding farm:", error);
        alert("❌ Error saving farm details. Please try again.");
    }
});
