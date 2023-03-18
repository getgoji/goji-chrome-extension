/**
 * Constants
 */
const DataCol = {
    NAME: 0,
    CARBON_EMISSIONS: 1,
    WATER_USAGE: 2,
    ETHICAL_SOURCING: 3,
    LABOR_RIGHTS: 4,
    TRANSPARENCY_AND_POLICY: 5,
    DEI: 6,
    TOTAL: 7,
    URL: 8,
};

const CATEGORY_NAMES = [
    "Carbon Emissions",
    "Water Usage",
    "Ethical Sourcing",
    "Labor Rights",
    "Transparency & Policy",
    "Diversity, Equity, & Inclusion",
];

/**
 * Setup Goji tab
 */
function setupTab() {
    shadow.getElementById("goji-tab--icon").src = chrome.runtime.getURL("icons/goji-tab.png");
}


/**
 * Return brand data and preferences as one array
 * @returns {Promise<Array>}
 */
async function getData() {
    /**
     * Extract this brand's data
     * @returns {Promise<void>}
     */
    async function extractBrandData() {
        // Load data file
        const csv = await fetch(chrome.runtime.getURL("data.csv"));
        const text = await csv.text();
        var brandData;

        // Loop through each branch
        text.split("\n").every((line) => {
            // Extract the URL to test
            const urlPattern = line.substring(line.lastIndexOf(",") + 1);

            if (window.location.href.includes(urlPattern)) {
                // Extract the rest of the brand data
                brandData = line.split(",");
                return false;
            }
            return true;
        });

        return brandData;
    }

    /**
     * Pull user preferences from storage
     * @returns {Promise<Array[Number]>}
     */
    async function getPreferencesSorted() {
        return new Promise((resolve) => {
            chrome.storage.sync.get(["preferences"], (storage) => {
                if (storage.preferences === undefined) {
                    // Create a default preference
                    const defaults = [0, 1, 2];
                    chrome.storage.sync.set({ preferences: defaults });
                    resolve(defaults);
                } else {
                    // Get the preferences and sort them
                    resolve(storage.preferences.sort());
                }
            });
        });
    }

    // Extract current state
    let brandData = await extractBrandData();
    let preferencesSorted = await getPreferencesSorted();

    // Return as an array
    return [brandData, preferencesSorted];
}

/**
 * Draw out Goji score given a percentile and div
 * @param {Number} gojiScorePercentile integer percentile score
 * @param {String} divName ID of the category div
 */
function printGojiScore(gojiScorePercentile, divName) {
    let numBerriesPrinted = 0;
    const overallGojiScore = document.getElementById(divName);
    while (numBerriesPrinted < 5) {
        const image = document.createElement("img");
        image.className = "goji-brand-card--score-icon";
        if (gojiScorePercentile > 20) {
            image.src = chrome.runtime.getURL("icons/goji.png");
            image.alt = "Goji";
            gojiScorePercentile -= 20;
        } else if (gojiScorePercentile > 10) {
            image.src = chrome.runtime.getURL("icons/half-goji.png");
            image.alt = "Half Goji";
            gojiScorePercentile -= 10;
        } else {
            image.src = chrome.runtime.getURL("icons/sad-goji.png");
            image.alt = "Sad Goji";
        }
        overallGojiScore.append(image);
        numBerriesPrinted += 1;
    }
}