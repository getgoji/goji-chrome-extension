// Set store name
const storeName = document.querySelector("#store_name");
let currentWebsite;
chrome.storage.local.get(["current_website"], (result) => {
    currentWebsite = result.current_website;
    storeName.innerHTML = currentWebsite;
});

// Load and sort preferences
let preferencesSorted;
chrome.storage.sync.get(['preferences'], (storage) => {
    if (storage.preferences === undefined) {
        chrome.storage.sync.set({ 'preferences': [0, 1, 2] });
        preferencesSorted = [0, 1, 2];
    } else {
        preferencesSorted = storage.preferences.sort();
    }
});

// Get category divs
const categoryPercentiles = document.querySelectorAll("#category_percentile");
const categoryNames = document.querySelectorAll("#category_name");
const categoryNamesText = ["Carbon Emissions", "Water Usage", "Ethical Sourcing", "Labor Rights", "Transparency & Policy", "Diversity, Equity, & Inclusion"];

fetch("../percentile.json").then(res => res.json()).then((data) => {
    // Get data current website index
    const currentWebsiteIndex = data["columns"].indexOf(currentWebsite);

    // For each favorited data category, print the percentile and category name
    let percentileTotal = 0;
    let personalizedPercentileTotal = 0;
    for (let i = 0; i < 6; i++) {
        const thisCategory = data["data"][i][currentWebsiteIndex];
        percentileTotal += thisCategory;
        if (preferencesSorted.includes(i)) {
            personalizedPercentileTotal += thisCategory;
            categoryPercentiles[i].innerHTML = thisCategory;
            categoryNames[i].innerHTML = categoryNamesText[i];
        }
    }
    let overallGojiScorePercentile = percentileTotal / 6;
    printGojiScore(overallGojiScorePercentile, "goji_score1");
    let personalizedGojiScorePercentile = personalizedPercentileTotal / 3;
    printGojiScore(personalizedGojiScorePercentile, "goji_score2");
});






function printGojiScore(gojiScorePercentile, divName) {
    let numBerriesPrinted = 0;
    const overallGojiScore = document.getElementById(divName);
    while (numBerriesPrinted < 5) {
        const image = document.createElement("img");
        image.id = "image";
        image.alt = "Goji icon";
        if (gojiScorePercentile > 20) {
            image.src = chrome.runtime.getURL("icons/sad-goji.png");
            gojiScorePercentile -= 20;
        } else if (gojiScorePercentile > 10){
            image.src = chrome.runtime.getURL("icons/half-goji.png");
            gojiScorePercentile -= 10;
        } else {
            image.src = chrome.runtime.getURL("icons/really-sad-goji.png");
        }
        overallGojiScore.append(image);
        numBerriesPrinted += 1;
    }
}