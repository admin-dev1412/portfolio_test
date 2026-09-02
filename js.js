document.addEventListener("DOMContentLoaded", () => {

    const profileToggle = document.querySelector(".profile-toggle");
    const profileContent = document.querySelector(".profile-content");
    const projectCards = document.querySelectorAll(".project-card");

    const tmiButton = document.querySelector(".tmi-button");
    const tmiPopup = document.querySelector(".tmi-popup");
    
    const customCursor = document.querySelector(".custom-cursor");

    /* =========================
       Profile Toggle
    ========================= */

    profileToggle.addEventListener("click", () => {

        const isOpen =
            profileToggle.getAttribute("aria-expanded") === "true";

        profileToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        profileContent.classList.toggle(
            "is-open",
            !isOpen
        );

    });


    /* =========================
       Project Scroll Animation
    ========================= */

    const projectObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.15
        }
    );


    projectCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 0.1}s`;

        projectObserver.observe(card);

    });


    /* =========================
       Project Hover Movement
    ========================= */

    projectCards.forEach((card) => {

        const image = card.querySelector("img");

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            image.style.transform =
                `scale(1.06) translate(${x * 8}px, ${y * 8}px)`;

        });


        card.addEventListener("mouseleave", () => {

            image.style.transform =
                "scale(1) translate(0, 0)";

        });

    });


    /* =========================
       Smooth Project Click
    ========================= */

    projectCards.forEach((card) => {

        card.addEventListener("click", (event) => {

            event.preventDefault();

            const destination = card.getAttribute("href");

            document.body.classList.add("page-exit");

            setTimeout(() => {
                window.location.href = destination;
            }, 350);

        });

    });


    /* =========================
       TMI Popup
    ========================= */

    let tmiTimer;

    tmiButton.addEventListener("click", () => {

        clearTimeout(tmiTimer);

        tmiPopup.classList.add("is-visible");
        tmiPopup.setAttribute("aria-hidden", "false");

        tmiTimer = setTimeout(() => {

            tmiPopup.classList.remove("is-visible");
            tmiPopup.setAttribute("aria-hidden", "true");

        }, 5000);

    });

});
/* =========================
   Custom Cursor
========================= */

document.addEventListener("mousemove", (event) => {

    customCursor.style.left = `${event.clientX}px`;
    customCursor.style.top = `${event.clientY}px`;

});


const cursorTargets = document.querySelectorAll(
    "a, button, .project-card"
);

cursorTargets.forEach((target) => {

    target.addEventListener("mouseenter", () => {
        customCursor.classList.add("is-hover");
    });

    target.addEventListener("mouseleave", () => {
        customCursor.classList.remove("is-hover");
    });

});