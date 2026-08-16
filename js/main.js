/* =========================================================
   EXPLORA OSA
   Main JavaScript
   ========================================================= */


/* =========================================================
   01. TOUR ACCORDIONS
   Opens and closes the detailed information
   for each tour.
   ========================================================= */

const tourCards = document.querySelectorAll(".tour-card");


tourCards.forEach((card) => {

    const button = card.querySelector(".tour-expand");

    if (!button) return;


    button.addEventListener("click", () => {

        const isExpanded =
            card.classList.contains("is-expanded");


        /*
         * Close all other tours first.
         * This keeps the page clean and prevents
         * several large sections from opening at once.
         */

        tourCards.forEach((otherCard) => {

            otherCard.classList.remove("is-expanded");

            const otherButton =
                otherCard.querySelector(".tour-expand");

            if (otherButton) {
                otherButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                otherButton.textContent =
                    "View experience →";
            }

        });


        /*
         * If the clicked tour wasn't already open,
         * open it.
         */

        if (!isExpanded) {

            card.classList.add("is-expanded");

            button.setAttribute(
                "aria-expanded",
                "true"
            );

            button.textContent =
                "Close experience ↑";

        }

    });

});


/* =========================================================
   02. WHATSAPP
   =========================================================
   
   IMPORTANT:
   Replace the placeholder number below with the
   official Explora Osa WhatsApp number.

   Costa Rica country code = 506

   Example format:
   506XXXXXXXX

   Do NOT include +, spaces, parentheses or dashes.
   ========================================================= */

const exploraWhatsApp =
    "506XXXXXXXX";


const whatsappButton =
    document.getElementById("whatsapp-button");


if (whatsappButton) {

    const whatsappMessage =
        encodeURIComponent(
            "Hola! I found Explora Osa online and I'd like to learn more about your tours."
        );


    whatsappButton.href =
        `https://wa.me/${exploraWhatsApp}?text=${whatsappMessage}`;

}


/* =========================================================
   03. SMOOTH NAVIGATION
   =========================================================
   
   Keeps internal navigation feeling natural,
   especially on mobile.
   ========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   04. TOUR IMAGE FALLBACK
   =========================================================
   
   If a photo hasn't been uploaded yet, the broken
   image icon is hidden instead of making the site
   look unfinished.
   ========================================================= */

const tourImages =
    document.querySelectorAll(
        ".tour-image img"
    );


tourImages.forEach((image) => {

    image.addEventListener(
        "error",
        () => {

            image.style.display = "none";

        }
    );

});


/* =========================================================
   05. CURRENT YEAR
   =========================================================
   
   If we later add a dynamic year element to the
   footer, this will automatically update it.
   ========================================================= */

const currentYear =
    document.querySelector(
        "[data-current-year]"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   06. PAGE READY
   ========================================================= */

document.documentElement.classList.add(
    "js-ready"
);
