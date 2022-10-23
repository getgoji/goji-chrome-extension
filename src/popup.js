// Connect toggle to each category
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

// Handle toggle
function togglePreference(category) {
    console.log("Toggling preference for " + category);
}

// Loading settings
chrome.storage.sync.set({ "preferences": [0, 1, 2] }, () => {
    console.log("Set preferences to [0,1,2]");
})

chrome.storage.sync.get(['preferences'], (storage) => {
    storage.preferences.forEach(preference => {
        console.log("Preferences are: " + preference);
    });
});