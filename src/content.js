const legalWebsites = {
    "A&F": "https://www.abercrombie.com",
    "American Eagle Outfitters": "https://www.ae.com",
    "Allbirds": "https://www.allbirds.com",
    "Amazon": "https://www.amazon.com",
    "Forever 21": "https://www.forever21.com",
    "Adidas Group": "https://www.adidas.com",
    "Lululemon": "https://shop.lululemon.com",
    "Reformation": "https://www.thereformation.com",
    "Gucci": "https://www.gucci.com",
    "Kohl's": "https://www.kohls.com/"
};
// "URBN","Besteller","Boohoo","Boyish Jeans","Brother Vellies","Burberry","C&A","Christy Dawn","Eileen Fisher","Everlane","Forever 21","Fashion Nova","Filippa K","Gap Inc.","Girlfriend Collective","Global Brands Group","Gucci","H&M Group","Inditex","J. Crew Inc.","JCPenney","Kohl's","Levi Strauss","Mara Hoffman","M&S","Missguided","Mothercare","MUD Jeans","Next","Nike","Nisolo","Patagonia","Primark","PVH","Ralph Lauren","Reformation","Ross","SHEIN","Stella McCartney","Target","The Children's Place","The Edinburgh Woollen Mill","TJX","Under Armour","Fast Retailing (Uniqlo)","VEJA","VF Corp","Victoria's Secret & Co","Walmart","Zalando"

Object.entries(legalWebsites).forEach(([name, url]) => {
    if (document.location.href.includes(url)) {
        chrome.storage.local.set({ 'current_website': name});
        popup();
    }
});

function popup() {
    // Get HTML tag
    const html = document.querySelector("html");

    // Create Goji icon image
    const image = document.createElement("img");
    image.id = "image";
    image.src = chrome.runtime.getURL("icons/goji-icon.png");
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
        if (!window.focus) {
            return true;
        }
        var href;
        if (typeof (mylink) == 'string') {
            href = mylink;
        } else {
            href = mylink.href;
        }
        window.open(href, "Goji Store Score", 'width=400,height=600,scrollbars=yes,location=0');
        return false;
    }
}

