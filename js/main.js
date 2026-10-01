document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       TOUR ACCORDION
       ================================================== */

    const tourButtons = document.querySelectorAll(".tour-expand");

    tourButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const card = button.closest(".tour-card");

            if (!card) return;

            const isOpen = card.classList.contains("is-expanded");

            document.querySelectorAll(".tour-card.is-expanded").forEach((openCard) => {

                if (openCard !== card) {
                    openCard.classList.remove("is-expanded");

                    const openButton = openCard.querySelector(".tour-expand");

                    if (openButton) {
                        openButton.setAttribute("aria-expanded", "false");
                        openButton.textContent = "View experience →";
                    }
                }

            });

            if (isOpen) {

                card.classList.remove("is-expanded");
                button.setAttribute("aria-expanded", "false");
                button.textContent = "View experience →";

            } else {

                card.classList.add("is-expanded");
                button.setAttribute("aria-expanded", "true");
                button.textContent = "Close experience ↑";

            }

        });

    });


    /* ==================================================
       TOUR PHOTO GALLERIES
       ================================================== */

    const tourImages = document.querySelectorAll(".tour-image");

    tourImages.forEach((imageContainer) => {

        const image = imageContainer.querySelector("img");

        if (!image) return;

        const originalSrc = image.getAttribute("src");

        if (!originalSrc) return;

        /*
         * Example:
         * images/surf/surf-01.webp
         *
         * becomes:
         * folder = images/surf/
         * name   = surf
         */

        const parts = originalSrc.split("/");
        const fileName = parts.pop();
        const folder = parts.join("/") + "/";

        const nameMatch = fileName.match(/^(.+?)-\d+\.webp$/i);

        if (!nameMatch) return;

        const baseName = nameMatch[1];

        /*
         * Corcovado has one slightly different filename:
         * corcovado-3.webp
         *
         * So we include both normal numbered files
         * and the special "3" version.
         */

        let galleryFiles = [];

        for (let i = 1; i <= 10; i++) {

            const number = String(i).padStart(2, "0");

            galleryFiles.push(
                `${folder}${baseName}-${number}.webp`
            );

        }

        if (baseName === "corcovado") {

            galleryFiles.push(
                `${folder}corcovado-3.webp`
            );

        }

        /*
         * Remove duplicates
         */

        galleryFiles = [...new Set(galleryFiles)];

        /*
         * Start with the image already confirmed
         */

        let validImages = [originalSrc];

        /*
         * Check which gallery images actually exist.
         */

        const checks = galleryFiles.map((src) => {

            return new Promise((resolve) => {

                if (src === originalSrc) {
                    resolve(src);
                    return;
                }

                const testImage = new Image();

                testImage.onload = () => resolve(src);

                testImage.onerror = () => resolve(null);

                testImage.src = src;

            });

        });

        Promise.all(checks).then((results) => {

            validImages = [
                ...new Set(
                    results.filter(Boolean)
                )
            ];

            /*
             * Don't create a gallery if there is only one photo.
             */

            if (validImages.length <= 1) return;

            createGallery(
                imageContainer,
                image,
                validImages
            );

        });

    });


    /* ==================================================
       CREATE GALLERY
       ================================================== */

    function createGallery(container, image, images) {

        let currentIndex = 0;

        container.classList.add("has-gallery");

        /*
         * Counter
         */

        const counter = document.createElement("div");

        counter.className = "gallery-counter";

        /*
         * Previous button
         */

        const previousButton = document.createElement("button");

        previousButton.className = "gallery-button gallery-prev";
        previousButton.type = "button";
        previousButton.setAttribute("aria-label", "Previous photo");
        previousButton.innerHTML = "←";

        /*
         * Next button
         */

        const nextButton = document.createElement("button");

        nextButton.className = "gallery-button gallery-next";
        nextButton.type = "button";
        nextButton.setAttribute("aria-label", "Next photo");
        nextButton.innerHTML = "→";

        /*
         * Controls
         */

        const controls = document.createElement("div");

        controls.className = "gallery-controls";

        controls.appendChild(previousButton);
        controls.appendChild(counter);
        controls.appendChild(nextButton);

        container.appendChild(controls);


        /*
         * Update gallery
         */

        function updateGallery() {

            image.src = images[currentIndex];

            counter.textContent =
                `${currentIndex + 1} / ${images.length}`;

        }


        /*
         * Previous
         */

        previousButton.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            currentIndex =
                (currentIndex - 1 + images.length)
                % images.length;

            updateGallery();

        });


        /*
         * Next
         */

        nextButton.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            currentIndex =
                (currentIndex + 1)
                % images.length;

            updateGallery();

        });


        /*
         * Keyboard support
         */

        container.addEventListener("keydown", (event) => {

            if (event.key === "ArrowLeft") {

                currentIndex =
                    (currentIndex - 1 + images.length)
                    % images.length;

                updateGallery();

            }

            if (event.key === "ArrowRight") {

                currentIndex =
                    (currentIndex + 1)
                    % images.length;

                updateGallery();

            }

        });

        container.setAttribute("tabindex", "0");

        updateGallery();

    }


    /* ==================================================
       SMOOTH NAVIGATION
       ================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ==================================================
       ACTIVE NAVIGATION
       ================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 160;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach((link) => {

            const href = link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();

});
