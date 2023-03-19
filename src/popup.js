// User preferences local copy
let userPreferences;

// Reference to all check boxes (category toggles)
const categoryToggles = document.querySelectorAll('input[type="checkbox"]');

// Reference to the submit button element
const submitButton = document.getElementById("submit");

// Load previous settings (or set new ones)
chrome.storage.sync.get(["preferences"], (storage) => {
  if (storage.preferences == undefined || storage.preferences.length < 3) {
    // No valid previous settings found, create new ones
    userPreferences = [0, 1, 2];
    chrome.storage.sync.set({ preferences: userPreferences });
  } else {
    // Restore previous settings
    userPreferences = storage.preferences;
  }

  // Update UI
  categoryToggles.forEach((toggle, category) => {
    toggle.checked = userPreferences.includes(category);
  });
});

// Set behavior for selecting a preference
categoryToggles.forEach((toggle, category) => {
  toggle.addEventListener("click", () => {
    if (userPreferences.includes(category)) {
      // Remove preference
      userPreferences.splice(userPreferences.indexOf(category), 1);
    } else {
      // Add preference
      userPreferences.push(category);
    }

    // Update submit button state
    submitButton.disabled = userPreferences.length != 3;
    submitButton.innerHTML = userPreferences.length === 3 ? "Save & Close" : "Pick 3 Categories";
  });
});

// Set submit button behavior
submitButton.addEventListener("click", () => {
  // Set preferences
  chrome.storage.sync.set({ preferences: userPreferences });

  // Tell everyone the preferences have changed
  (async () => {
    // Get tabs
    const tabs = await chrome.tabs.query({ currentWindow: true });
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { gojiPreferencesChanged: "true" });
    })

    // Close popup
    window.close();
  })();
});
