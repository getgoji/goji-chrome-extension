// User preferences local copy
let userPreferences = [0, 1, 2];

// Handle on load stuff
document.addEventListener("DOMContentLoaded", () => {
    // Load previous settings
    chrome.storage.sync.get(['preferences'], (storage) => {
        userPreferences = storage.preferences;
    });

    // Add event listeners
    const carbon_emissions = document.getElementById("carbon_emissions");
    carbon_emissions.addEventListener("click", () => {
        togglePreference(0);
    });

    const water_usage = document.getElementById("water_usage");
    water_usage.addEventListener("click", () => {
        togglePreference(1);
    });

    const ethical_sourcing = document.getElementById("ethical_sourcing");
    ethical_sourcing.addEventListener("click", () => {
        togglePreference(2);
    });

    const labor_rights = document.getElementById("labor_rights");
    labor_rights.addEventListener("click", () => {
        togglePreference(3);
    });

    const transparency = document.getElementById("transparency");
    transparency.addEventListener("click", () => {
        togglePreference(4);
    });

    const dei = document.getElementById("dei");
    dei.addEventListener("click", () => {
        togglePreference(5);
    });

    // Apply settings
    const categories = [carbon_emissions, water_usage, ethical_sourcing, labor_rights, transparency, dei];
    for (let i = 0; i < categories.length; i++) {
        categories[i].checked = userPreferences.includes(i);
    }
});


// Handle toggle
function togglePreference(category) {
    console.log("Toggling preference for " + category);
}

