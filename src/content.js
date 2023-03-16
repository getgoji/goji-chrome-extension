// Get HTML tag
const html = document.querySelector("html");

// Create Goji icon image
const image = document.createElement("img");
image.src = chrome.runtime.getURL("icons/goji-icon.png");
image.alt = "Goji icon";

// Create tab
const gojiTabElement = document.createElement("div");
gojiTabElement.id = "goji-tab";
gojiTabElement.append(image);

// Inject tab
html.append(gojiTabElement);

// Get current website name
fetch(chrome.runtime.getURL("percentile.csv"))
  .then((res) => res.text())
  .then((data) => {
    const lineSplit = data.split("\n");
    lineSplit.forEach(line => {
      const splitLine = line.split(",");
      if (window.location.href.includes(splitLine[8])) {
        chrome.storage.local.set({ current_website: splitLine[0] });
      }
    });
  });

// Add click behavior
gojiTabElement.addEventListener("click", function handleClick() {
  present(chrome.runtime.getURL("components/websitestatus.html"));
});

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
