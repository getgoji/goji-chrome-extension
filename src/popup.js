// User preferences local copy
let userPreferences;
const categories = document.querySelectorAll('input[type="checkbox"]');

// Handle on load stuff
document.addEventListener("DOMContentLoaded", () => {
    // Load previous settings (or set new ones)
    chrome.storage.sync.get(['preferences'], (storage) => {
        if (storage.preferences == undefined || storage.preferences.length < 3) {
            userPreferences = [0, 1, 2];
            chrome.storage.sync.set({ 'preferences': userPreferences });
        } else {
            userPreferences = storage.preferences;
        }
        // Apply settings
        updateToggles();
    });

    // Add event listeners
    for (let i = 0; i < categories.length; i++) {
        categories[i].addEventListener('click', () => {
            togglePreference(i);
        });
    }
});


// Handle toggle
function togglePreference(category) {
    // Remove category
    if (userPreferences.includes(category)) {
        userPreferences.splice(userPreferences.indexOf(category), 1);
    } else {
        // Add category and remove last one
        userPreferences.pop();
        userPreferences.unshift(category);
    }

    // Save settings
    chrome.storage.sync.set({ 'preferences': userPreferences });

    // Update UI
    updateToggles();
}

// Update toggle UI based on user preferences
function updateToggles() {
    for (let i = 0; i < categories.length; i++) {
        categories[i].checked = userPreferences.includes(i);
    }
}

