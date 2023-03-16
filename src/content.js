/**
 * Inject tab
 */
fetch(chrome.runtime.getURL("components/tab.html"))
  .then(response => response.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);

    // Set Goji tab icon
    document.getElementById("goji-tab-icon").src = chrome.runtime.getURL("icons/goji-icon.png");
  });

/**
 * Inject brand info card
 */
fetch(chrome.runtime.getURL("components/brand.html"))
  .then(response => response.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);

    // Populate brand info card
    getData().then((data) => {
      // Get data
      let brandData = data[0];
      let preferencesSorted = data[1];

      // Apply brand name
      document.getElementById("brand-name").innerHTML = brandData[DataCol.NAME];

      // Get HTML elements
      const categoryPercentiles = document.querySelectorAll("#category-percentile");
      const categoryNames = document.querySelectorAll("#category-name");

      // Populate personalized category percentiles
      let personalizedPercentileTotal = 0;
      preferencesSorted.forEach((preference, index) => {
        const thisCategory = brandData[preference + 1];
        personalizedPercentileTotal += thisCategory;
        categoryPercentiles[index].innerHTML = thisCategory;
        categoryNames[index].innerHTML = CATEGORY_NAMES[preference];
      });
    })
  })

// Add click behavior
// gojiTabElement.addEventListener("click", function handleClick() {
//   present(chrome.runtime.getURL("components/websitestatus.html"));
// });

/**
 * Present the Goji website status popup window
 * @param {string} mylink resolved URL to popup HTML document
 * @returns {void} returns early if the window is not in focus
 */
function present(mylink) {
  // Exit early if the window is not in focus
  if (!window.focus) {
    return;
  }

  // Extract the HTML document url
  var href;
  if (typeof mylink == "string") {
    href = mylink;
  } else {
    href = mylink.href;
  }

  // Present popup
  window.open(
    href,
    "Goji Store Score",
    "width=400,height=600,scrollbars=yes,location=0"
  );
}
