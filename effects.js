/* ============================================================
   EFFECTS
   Small visual reactions that make the website feel alive
============================================================ */


/* ============================================================
   PAGE FLICKER
============================================================ */

function runPageFlicker() {
    document.body.classList.remove("page-flicker");

    /* Restarts the animation if it was recently used */
    void document.body.offsetWidth;

    document.body.classList.add("page-flicker");

    window.setTimeout(() => {
        document.body.classList.remove("page-flicker");
    }, 650);
}


/* ============================================================
   FLASHLIGHT REACTION
============================================================ */

function initSecretFlashlightEffects() {
    const flashlight = document.getElementById("flashlight");
    const secretObjects = document.querySelectorAll(
        "#secret-owl, #secret-coffee, #secret-note, #secret-rift, [data-secret]"
    );

    if (!flashlight || !secretObjects.length) {
        return;
    }

    secretObjects.forEach((secret) => {
        secret.addEventListener("mouseenter", () => {
            flashlight.style.width = "500px";
            flashlight.style.height = "500px";
            flashlight.style.opacity = "1";
        });

        secret.addEventListener("mouseleave", () => {
            flashlight.style.width = "";
            flashlight.style.height = "";
            flashlight.style.opacity = "";
        });
    });
}


/* ============================================================
   SECRET CLICK REACTIONS
============================================================ */

function initSecretClickEffects() {
    const owl = document.getElementById("secret-owl");
    const coffee = document.getElementById("secret-coffee");
    const note = document.getElementById("secret-note");
    const rift = document.getElementById("secret-rift");

    if (owl) {
        owl.addEventListener("click", () => {
            runPageFlicker();
        });
    }

    if (coffee) {
        coffee.addEventListener("click", () => {
            document.body.classList.add("coffee-cursor");

            window.setTimeout(() => {
                document.body.classList.remove("coffee-cursor");
            }, 4000);
        });
    }

    if (note) {
        note.addEventListener("click", () => {
            runPageFlicker();
        });
    }

    if (rift) {
        rift.addEventListener("click", () => {
            runPageFlicker();

            window.setTimeout(() => {
                window.location.href = "after-dismissal.html";
            }, 700);
        });
    }
}


/* ============================================================
   INTRO BUTTON REACTION
============================================================ */

function initIntroEffects() {
    const enterButton = document.getElementById("enter-button");

    if (!enterButton) {
        return;
    }

    enterButton.textContent = "Access Archive";

    enterButton.addEventListener("click", () => {
        runPageFlicker();
    });
}


/* ============================================================
   INITIALIZE EFFECTS
============================================================ */

function initWebsiteEffects() {
    initSecretFlashlightEffects();
    initSecretClickEffects();
    initIntroEffects();
}

document.addEventListener("DOMContentLoaded", initWebsiteEffects);
/* ============================================================
   BOOK COVER DISTURBANCE
   Occasionally alters the cover-status message
============================================================ */

function initBookCoverDisturbance() {
    const coverStatus = document.querySelector(".cover-status");

    if (!coverStatus) {
        return;
    }

    const originalMessage = coverStatus.textContent.trim();

    const strangeMessages = [
        "This cover was not approved.",
        "File image unavailable.",
        "Do not open the book again.",
        "Publication status: under observation."
    ];

    function disturbCoverStatus() {
        const shouldChange = Math.random() < 0.45;

        if (shouldChange) {
            const randomMessage =
                strangeMessages[
                    Math.floor(Math.random() * strangeMessages.length)
                ];

            runPageFlicker();

            coverStatus.textContent = randomMessage;

            window.setTimeout(() => {
                coverStatus.textContent = originalMessage;
            }, 3200);
        }

        const nextDelay =
            Math.random() * 50000 + 35000;

        window.setTimeout(
            disturbCoverStatus,
            nextDelay
        );
    }

    const firstDelay =
        Math.random() * 30000 + 20000;

    window.setTimeout(
        disturbCoverStatus,
        firstDelay
    );
}

document.addEventListener(
    "DOMContentLoaded",
    initBookCoverDisturbance
);
/* ============================================================
   F.I.I.A. SEAL DISTURBANCE
   Briefly changes the hero heading after the seal is clicked
============================================================ */

function initFiiaSealDisturbance() {
    const fiiaSeal = document.getElementById("secret-owl");
    const presentsText = document.querySelector("#hero .presents");

    if (!fiiaSeal || !presentsText) {
        return;
    }

    const originalText = presentsText.textContent.trim();

    fiiaSeal.addEventListener("click", () => {
        runPageFlicker();

        presentsText.textContent = "F.I.I.A. Presents";

        window.setTimeout(() => {
            presentsText.textContent =
                "This presentation was not authorized.";
        }, 1200);

        window.setTimeout(() => {
            runPageFlicker();
            presentsText.textContent = originalText;
        }, 3600);
    });
}

document.addEventListener(
    "DOMContentLoaded",
    initFiiaSealDisturbance
);
/* ============================================================
   NIGHT SKY SYSTEM
   Shooting stars, drifting dust, and subtle parallax
============================================================ */


/* ============================================================
   CREATE ATMOSPHERE LAYERS
============================================================ */

function createNightSkyLayers() {
    if (document.getElementById("night-sky")) {
        return;
    }

    const nightSky = document.createElement("div");
    nightSky.id = "night-sky";
    nightSky.setAttribute("aria-hidden", "true");

    const stars = document.createElement("div");
    stars.className = "night-stars";

    const dust = document.createElement("div");
    dust.className = "night-dust";

    const shootingStarLayer = document.createElement("div");
    shootingStarLayer.className = "shooting-star-layer";

    nightSky.appendChild(stars);
    nightSky.appendChild(dust);
    nightSky.appendChild(shootingStarLayer);

    document.body.prepend(nightSky);
}


/* ============================================================
   RANDOM STARS
============================================================ */

function createStars() {
    const starLayer = document.querySelector(".night-stars");

    if (!starLayer || starLayer.children.length) {
        return;
    }

    const starCount = 70;

    for (let index = 0; index < starCount; index++) {
        const star = document.createElement("span");

        star.className = "night-star";

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        star.style.setProperty(
            "--star-size",
            `${Math.random() * 2 + 1}px`
        );

        star.style.setProperty(
            "--twinkle-delay",
            `${Math.random() * 8}s`
        );

        star.style.setProperty(
            "--twinkle-duration",
            `${Math.random() * 5 + 4}s`
        );

        starLayer.appendChild(star);
    }
}


/* ============================================================
   DRIFTING DUST
============================================================ */

function createDustParticles() {
    const dustLayer = document.querySelector(".night-dust");

    if (!dustLayer || dustLayer.children.length) {
        return;
    }

    const particleCount = 24;

    for (let index = 0; index < particleCount; index++) {
        const particle = document.createElement("span");

        particle.className = "dust-particle";

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        particle.style.setProperty(
            "--dust-size",
            `${Math.random() * 3 + 1}px`
        );

        particle.style.setProperty(
            "--dust-delay",
            `${Math.random() * -20}s`
        );

        particle.style.setProperty(
            "--dust-duration",
            `${Math.random() * 18 + 18}s`
        );

        dustLayer.appendChild(particle);
    }
}


/* ============================================================
   SHOOTING STAR
============================================================ */

function launchShootingStar() {
    const layer = document.querySelector(".shooting-star-layer");

    if (!layer) {
        return;
    }

    const star = document.createElement("span");

    star.className = "shooting-star";

    star.style.top = `${Math.random() * 42 + 5}%`;
    star.style.left = `${Math.random() * 35 + 5}%`;

    layer.appendChild(star);

    window.setTimeout(() => {
        star.remove();
    }, 1800);
}


function scheduleShootingStar() {
    const nextDelay =
        Math.random() * 70000 + 30000;

    window.setTimeout(() => {
        const shouldAppear = Math.random() < 0.7;

        if (shouldAppear) {
            launchShootingStar();
        }

        scheduleShootingStar();
    }, nextDelay);
}


/* ============================================================
   SUBTLE MOUSE PARALLAX
============================================================ */

function initSkyParallax() {
    const starLayer = document.querySelector(".night-stars");
    const dustLayer = document.querySelector(".night-dust");

    if (!starLayer || !dustLayer) {
        return;
    }

    document.addEventListener("mousemove", (event) => {
        const horizontal =
            event.clientX / window.innerWidth - 0.5;

        const vertical =
            event.clientY / window.innerHeight - 0.5;

        starLayer.style.transform =
            `translate(${horizontal * -10}px, ${vertical * -10}px)`;

        dustLayer.style.transform =
            `translate(${horizontal * -18}px, ${vertical * -18}px)`;
    });
}


/* ============================================================
   INITIALIZE NIGHT SKY
============================================================ */

function initNightSky() {
    createNightSkyLayers();
    createStars();
    createDustParticles();
    initSkyParallax();
    scheduleShootingStar();
}

document.addEventListener(
    "DOMContentLoaded",
    initNightSky
);
/* ============================================================
   FIX — NATHAN'S COFFEE DISCOVERY
============================================================ */

function initCoffeeDiscoveryFix() {
    const coffeeCup = document.getElementById("secret-coffee");

    if (!coffeeCup || coffeeCup.dataset.coffeeReady === "true") {
        return;
    }

    coffeeCup.dataset.coffeeReady = "true";

    coffeeCup.addEventListener("click", () => {
        if (typeof runPageFlicker === "function") {
            runPageFlicker();
        }

        if (typeof showDiscovery === "function") {
            showDiscovery(
                "Nathan’s Coffee",
                "The coffee is still warm.\n\nNathan left hours ago."
            );

            return;
        }

        /* Creates the note window if it did not load correctly. */

        let discoveryWindow =
            document.getElementById("discovery-window");

        if (!discoveryWindow) {
            discoveryWindow = document.createElement("div");
            discoveryWindow.id = "discovery-window";

            discoveryWindow.innerHTML = `
                <div class="discovery-card">
                    <button
                        id="close-discovery"
                        type="button"
                        aria-label="Close note"
                    >
                        ×
                    </button>

                    <h2 id="discovery-title">
                        Nathan’s Coffee
                    </h2>

                    <p id="discovery-text">
                        The coffee is still warm.
                        Nathan left hours ago.
                    </p>
                </div>
            `;

            document.body.appendChild(discoveryWindow);
        }

        discoveryWindow.style.display = "flex";

        const closeButton =
            discoveryWindow.querySelector("#close-discovery");

        if (closeButton) {
            closeButton.onclick = () => {
                discoveryWindow.style.display = "none";
            };
        }
    });
}

document.addEventListener(
    "DOMContentLoaded",
    initCoffeeDiscoveryFix
);
/* ============================================================
   WEBSITE HEARTBEAT
   Rare, quiet moments that make the page feel alive
============================================================ */

function pulseRandomDetail() {
    const details = [
        document.querySelector(".book-placeholder"),
        document.querySelector(".author-photo"),
        document.querySelector(".game-card"),
        document.getElementById("secret-owl"),
        document.getElementById("secret-coffee"),
        document.getElementById("secret-rift")
    ].filter(Boolean);

    if (!details.length) {
        return;
    }

    const chosenDetail =
        details[Math.floor(Math.random() * details.length)];

    chosenDetail.classList.add("ambient-pulse");

    window.setTimeout(() => {
        chosenDetail.classList.remove("ambient-pulse");
    }, 1800);
}


function scheduleWebsiteHeartbeat() {
    const nextDelay =
        Math.random() * 45000 + 25000;

    window.setTimeout(() => {
        const shouldPulse = Math.random() < 0.72;

        if (shouldPulse) {
            pulseRandomDetail();
        }

        scheduleWebsiteHeartbeat();
    }, nextDelay);
}


function initWebsiteHeartbeat() {
    scheduleWebsiteHeartbeat();
}


document.addEventListener(
    "DOMContentLoaded",
    initWebsiteHeartbeat
);
/* ============================================================
   MASTER AMBIENT DIRECTOR
============================================================ */

function runAmbientEvent() {

    const events = [

        () => {
            if (typeof runPageFlicker === "function") {
                runPageFlicker();
            }
        },

        () => {

            const owl =
                document.getElementById("secret-owl");

            if (owl) {

                owl.classList.add("ambient-pulse");

                setTimeout(() => {

                    owl.classList.remove("ambient-pulse");

                },1800);

            }

        },

        () => {

            const coffee =
                document.getElementById("secret-coffee");

            if (coffee) {

                coffee.classList.add("ambient-pulse");

                setTimeout(()=>{

                    coffee.classList.remove("ambient-pulse");

                },1800);

            }

        },

        () => {

            const rift =
                document.getElementById("secret-rift");

            if (rift){

                rift.classList.add("ambient-pulse");

                setTimeout(()=>{

                    rift.classList.remove("ambient-pulse");

                },1800);

            }

        }

    ];

    const randomEvent =
        events[Math.floor(Math.random()*events.length)];

    randomEvent();

}

function initAmbientDirector(){

    function nextEvent(){

        const delay =
            Math.random()*40000 + 25000;

        setTimeout(()=>{

            runAmbientEvent();

            nextEvent();

        },delay);

    }

    nextEvent();

}

document.addEventListener(
    "DOMContentLoaded",
    initAmbientDirector
);

