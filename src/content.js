console.log("We see this website: " + document.location.href);
const legalWebsites = ["https://www.forever21.com/*",
                       "https://www.adidas.com/us/*",
                       "https://www.thereformation.com/*",
                       "https://www.sears.com/*",
                       "https://www.zara.com/us/*",
                       "http://example.com/"];

legalWebsites.forEach(checkIfClothingBrand);

function checkIfClothingBrand(url) {
    if (url.includes(document.location.href)) {
        console.log("Did the popup work?");
        popup(document.location.href, 'notes');
    }
}

function popup(mylink, windowname) { 
    // Get HTML tag
    const html = document.querySelector("html");

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = "overlay";

    // Inject overlay
    html.insertAdjacentElement("beforeend", overlay);


    // if (! window.focus)return true; 
    // var href; 
    // if (typeof(mylink) == 'string') href=mylink; 
    // else href=mylink.href; 
    // window.open(href, windowname, 'width=400,height=200,scrollbars=yes'); 
    // return false; 
}