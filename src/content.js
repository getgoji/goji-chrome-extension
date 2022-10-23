console.log("We see this website: " + document.location.href);
const legalWebsites = [
    "https://www.forever21.com",
    "https://www.adidas.com",
    "https://www.thereformation.com",
    "https://www.sears.com",
    "https://www.zara.com",
    "http://example.com"];

legalWebsites.forEach(url => {
    if (document.location.href.includes(url)) {
        popup();
    }
});

function popup() {
    // Get HTML tag
    const html = document.querySelector("html");

    // Create Goji icon image
    const image = document.createElement("img");
    image.id = "image";
    image.src = chrome.runtime.getURL("icons/icon-32.png");
    image.alt = "Goji icon";

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.append(image);

    // Inject overlay
    html.append(overlay);

    const button = document.getElementById("overlay");

    button.addEventListener('click', function handleClick() {
        console.log('element clicked');
        popup(chrome.runtime.getURL("components/websitestatus.html"));
    });

    function popup(mylink) { 
        if (! window.focus) {
            return true; 
        }
        var href; 
        if (typeof(mylink) == 'string') {
            href=mylink; 
        } else {
            href=mylink.href; 
        }
        window.open(href, "Store Name", 'width=400,height=200,scrollbars=yes'); 
        return false; 
    }
}

