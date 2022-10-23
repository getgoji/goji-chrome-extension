// Set name
const storeName = document.querySelector("#store_name");
chrome.storage.local.get(["current_website"], (result) => {
    storeName.innerHTML = result.current_website;
});

// Load and sort preferences
let preferencesSorted;
chrome.storage.sync.get(["preferences"], (result) => {
    preferencesSorted = storage.preferences.sort();
});

// Get category divs
const category0Div = document.getElementById("#cat0");
const category1Div = document.getElementById("#cat1");
const category2Div = document.getElementById("#cat2");



category0Div.innerHTML = "";