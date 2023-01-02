/**
 * Pull current website from local storage
 * @returns {string} Name of current website
 */
const getCurrentWebsite = async () => {
  return new Promise((resolve) => {
    // Set store name
    chrome.storage.local.get(["current_website"], (result) => {
      let currentWebsite = result.current_website;
      resolve(currentWebsite);
    });
  });
};

/**
 * Get preferences. Create a default preference if none-exist
 * @returns {Array[Number]} Preferences list
 */
const getPreferencesSorted = async () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["preferences"], (storage) => {
      if (storage.preferences === undefined) {
        // Create a default preference
        chrome.storage.sync.set({ preferences: [0, 1, 2] });
        resolve([0, 1, 2]);
      } else {
        // Get the preferences and sort them
        resolve(storage.preferences.sort());
      }
    });
  });
};

/**
 * Read data from database
 */
async function getData() {
  // Extract current state
  let currentWebsite = await getCurrentWebsite();
  let preferencesSorted = await getPreferencesSorted();

  // Apply webiste name
  document.getElementById("brand-name").innerHTML = currentWebsite;

  // Get HTML elements
  const categoryPercentiles = document.querySelectorAll("#category-percentile");
  const categoryNames = document.querySelectorAll("#category-name");
  const categoryNamesText = [
    "Carbon Emissions",
    "Water Usage",
    "Ethical Sourcing",
    "Labor Rights",
    "Transparency & Policy",
    "Diversity, Equity, & Inclusion",
  ];

  // Extract json data
  fetch("../percentile.json")
    .then((res) => res.json())
    .then((data) => {
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
          categoryPercentiles[preferencesSorted.indexOf(i)].innerHTML =
            thisCategory;
          categoryNames[preferencesSorted.indexOf(i)].innerHTML =
            categoryNamesText[i];
        }
      }

      let overallGojiScorePercentile = percentileTotal / 6;
      printGojiScore(overallGojiScorePercentile, "overall-score");

      let personalizedGojiScorePercentile = personalizedPercentileTotal / 3;
      printGojiScore(personalizedGojiScorePercentile, "personalized-score");
    });
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
    image.alt = "Goji icon";
    if (gojiScorePercentile > 20) {
      image.src = chrome.runtime.getURL("icons/sad-goji.png");
      gojiScorePercentile -= 20;
    } else if (gojiScorePercentile > 10) {
      image.src = chrome.runtime.getURL("icons/half-goji.png");
      gojiScorePercentile -= 10;
    } else {
      image.src = chrome.runtime.getURL("icons/really-sad-goji.png");
    }
    overallGojiScore.append(image);
    numBerriesPrinted += 1;
  }
}

// Run
getData();
