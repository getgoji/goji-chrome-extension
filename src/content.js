console.log("We see this website: " + document.location.href);
const legalWebsites = ["https://www.forever21.com",
    "https://www.adidas.com",
    "https://www.thereformation.com",
    "https://www.sears.com",
    "https://www.zara.com",
    "http://example.com"];

legalWebsites.forEach(checkIfClothingBrand);

function checkIfClothingBrand(url) {
    if (document.location.href.includes(url)) {
        console.log("Did the popup work?");
        popup(document.location.href, 'notes');
    }
}

function popup(mylink, windowname) {
    // Get HTML tag
    const html = document.querySelector("html");

    // Create Goji icon image
    const image = document.createElement("img");
    image.src = chrome.runtime.getURL("icons/icon-32.png");
    image.alt = "Goji icon";

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.append(image);

    // Inject overlay
    html.append(overlay);


    // if (! window.focus)return true; 
    // var href; 
    // if (typeof(mylink) == 'string') href=mylink; 
    // else href=mylink.href; 
    // window.open(href, windowname, 'width=400,height=200,scrollbars=yes'); 
    // return false; 
}