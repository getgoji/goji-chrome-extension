console.log("We see this website: " + document.location.href);

chrome.storage.sync.set({ "preferences": [0, 1, 2] }, () => {
    console.log("Set preferences to [0,1,2]");
})

chrome.storage.sync.get(['preferences'], (storage) => {
    storage.preferences.forEach(preference => {
        console.log("Preferences are: " + preference);
    });
});