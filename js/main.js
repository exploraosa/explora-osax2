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

            if (otherCard !== card) {

                otherCard.classList.remove("is-expanded");

                const otherButton =
                    otherCard.querySelector(".tour-expand");

                if (otherButton) {
                    otherButton.textContent =
                        "View Experience";
                }
            }
        });


        /*
         * Toggle the selected tour.
         */

        if (isExpanded) {

            card.classList.remove("is-expanded");

            button.textContent =
                "View Experience";

        } else {

            card.classList.add("is-expanded");

            button.textContent =
                "Close Experience";
        }

    });

});


/* =========================================================
   02. SMOOTH NAVIGATION
   Makes the navigation links scroll smoothly
   to each section.
   ========================================================= */

const navigationLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


navigationLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");


        /*
         * Ignore empty "#" links.
         * This is especially useful for the WhatsApp
         * button until the real WhatsApp link is added.
         */

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   03. WHATSAPP BUTTON
   The actual WhatsApp number will be added later.
   For now the button remains inactive so we don't
   accidentally send visitors to the wrong number.
   ========================================================= */

const whatsappButton =
    document.querySelector("#whatsapp-button");


if (whatsappButton) {

    whatsappButton.addEventListener(
        "click",
        (event) => {

            const href =
                whatsappButton.getAttribute("href");


            if (
                !href ||
                href === "#"
            ) {
                event.preventDefault();

                console.log(
                    "WhatsApp link has not been added yet."
                );
            }

        }
    );

}


/* =========================================================
   04. ACTIVE NAVIGATION STATE
   Adds a small active state to navigation links
   based on the section currently visible.
   ========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".main-nav a"
    );


const updateActiveNavigation =
    () => {

        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            const scrollPosition =
                window.scrollY;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");


            if (
                href === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================================
   05. PAGE LOAD
   Make sure the correct navigation state is shown
   immediately when the page loads.
   ========================================================= */

updateActiveNavigation();
