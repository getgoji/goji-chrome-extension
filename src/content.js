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

        // Add CSS
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', chrome.runtime.getURL("styles/card.css"));
        shadow.appendChild(style);

        // Setup Tab
        setupTab();

        // Set open function
        const tabElement = shadow.getElementById("goji-tab");
        tabElement.addEventListener("click", () => {
            // Tab styles
            tabElement.classList.toggle("goji-tab--open");
            shadow.getElementById("goji-tab--icon").classList.toggle("goji-tab--icon--open");
            shadow.getElementById("goji-tab--cross").classList.toggle("goji-tab--cross--open");

            shadow.getElementById("goji-brand-card").classList.toggle("goji-brand-card--open");
        });

        // Setup brand info
        setupBrand();
    })
