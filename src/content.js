// Create host and inject into page
const host = document.createElement('div');
host.setAttribute('id', 'goji-card-host');
document.body.insertAdjacentElement('beforeend', host);

// Create shadow DOM
const shadow = host.attachShadow({ mode: 'open' });

// Inject card
fetch(chrome.runtime.getURL("components/card.html"))
    .then(response => response.text())
    .then(html => {
        // Add HTML
        shadow.innerHTML = html;

        // Add JS
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL("src/card.js");
        script.setAttribute('id', 'goji-card-script');
        script.setAttribute('type', 'text/javascript');
        shadow.appendChild(script);
    })

/**
 * Inject tab
 */
// fetch(chrome.runtime.getURL("components/tab.html"))
//   .then(response => response.text())
//   .then(html => {
//     document.body.insertAdjacentHTML("beforeend", html);

//     // Set Goji tab icon
//     document.getElementById("goji-tab--icon").src = chrome.runtime.getURL("icons/goji-tab.png");

//     // Set open function
//     const tabElement = document.getElementById("goji-tab");
//     tabElement.addEventListener("click", () => {
//       // Tab styles
//       tabElement.classList.toggle("goji-tab--open");
//       document.getElementById("goji-tab--icon").classList.toggle("goji-tab--icon--open");
//       document.getElementById("goji-tab--cross").classList.toggle("goji-tab--cross--open");

//       document.getElementById("goji-brand-card").classList.toggle("goji-brand-card--open");
//     });
//   });

// /**
//  * Inject brand info card
//  */
// fetch(chrome.runtime.getURL("components/brand.html"))
//   .then(response => response.text())
//   .then(html => {
//     document.body.insertAdjacentHTML("beforeend", html);

//     // Populate brand info card
//     getData().then((data) => {
//       // Get data
//       let brandData = data[0];
//       let preferencesSorted = data[1];

//       // Apply brand name
//       document.getElementById("goji-brand-card--name").innerHTML = brandData[DataCol.NAME];

//       // Get HTML elements
//       const categoryPercentiles = document.querySelectorAll(".goji-brand-card--category-percentile");
//       const categoryNames = document.querySelectorAll(".goji-brand-card--category-name");

//       // Populate personalized category percentiles
//       let personalizedPercentileTotal = 0;
//       preferencesSorted.forEach((preference, index) => {
//         const thisCategory = parseInt(brandData[preference + 1]);
//         personalizedPercentileTotal += thisCategory;
//         categoryPercentiles[index].innerHTML = thisCategory;
//         categoryNames[index].innerHTML = CATEGORY_NAMES[preference];
//       });

//       // Print Goji score
//       printGojiScore(brandData[DataCol.TOTAL], "goji-brand-card--overall-score");
//       printGojiScore(personalizedPercentileTotal / 3, "goji-brand-card--personalized-score");
//     });
//   });
