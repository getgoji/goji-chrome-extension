const legalWebsites = {
    "A&F": "https://www.abercrombie.com",
    "American Eagle Outfitters": "https://www.ae.com",
    "Allbirds": "https://www.allbirds.com",
    "Amazon": "https://www.amazon.com",
    "Adidas Group": "https://www.adidas.com",
    "Boohoo": "https://us.boohoo.com",
    "Boyish Jeans": "https://www.boyish.com",
    "Burberry": "https://us.burberry.com",
    "Brother Vellies": "https://brothervellies.com",
    "C&A": "https://www.c-and-a.com",
    "Christy Dawn": "https://christydawn.com/",
    "Eileen Fisher": "https://www.eileenfisher.com/",
    "Everlane": "https://www.everlane.com/",
    "Fashion Nova": "https://www.fashionnova.com/",
    "Filippa K": "https://www.filippa-k.com/",
    "Forever 21": "https://www.forever21.com",
    "Gap Inc.": "https://www.gap.com/",
    "Girlfriend Collective": "https://girlfriend.com/",
    "Lululemon": "https://shop.lululemon.com",
    "Reformation": "https://www.thereformation.com",
    "Gucci": "https://www.gucci.com",
    "Kohl's": "https://www.kohls.com/",
    "M&S": "https://www.marksandspencer.com/",
    "Missguided": "https://www.missguided.co.uk/",
    "Mothercare": "https://www.mothercare.com.sg/",
    "MUD Jeans": "https://mudjeans.eu/",
    "Next": "https://www.next.co.uk/",
    "Nike": "https://www.nike.com/",
    "Mara Hoffman": "https://marahoffman.com/",
    "Nisolo": "https://nisolo.com/",
    "Patagonia": "https://www.patagonia.com",
    "Primark": "https://www.primark.com",
    "Ralph Lauren": "https://www.ralphlauren.com/",
    "Ross": "https://www.rossstores.com/",
    "SHEIN": "https://us.shein.com",
    "Stella McCartney": "https://www.stellamccartney.com",
    "Target": "https://www.target.com",
    "The Children's Place": "https://www.childrensplace.com",
    "H&M Group": "https://www2.hm.com/en_us",
    "Inditex": "https://www.inditex.com",
    "J. Crew Inc.": "https://www.jcrew.com",
    "JCPenney": "https://www.jcpenney.com",
    "Levi Strauss": "https://www.levi.com",
    "The Edinburgh Woollen Mill": "https://www.ewm.co.uk",
    "Under Armour": "https://www.underarmour.com/en-us",
    "URBN": "https://www.urbanoutfitters.com",
    "VEJA": "https://www.veja-store.com",
    "Victoria's Secret & Co": "https://www.victoriassecret.com",
    "Walmart": "https://www.walmart.com",
    "Zalando": "https://www.zalando",

};

// Parent Companies: "Besteller", "VF Corp", "TJX", "Fast Retailing (Uniqlo)", "PVH", "Gap Inc.", "Global Brands Group",

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

