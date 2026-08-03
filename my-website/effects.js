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
/* ============================================================
   RARE CONSTELLATION
   Quietly draws itself in the background, then disappears
============================================================ */

function createConstellation() {
    const nightSky = document.getElementById("night-sky");

    if (!nightSky || document.querySelector(".constellation")) {
        return;
    }

    const constellation = document.createElement("div");
    constellation.className = "constellation";
    constellation.setAttribute("aria-hidden", "true");

    constellation.innerHTML = `
        <svg
            viewBox="0 0 320 220"
            role="presentation"
        >
            <g class="constellation-lines">
                <line x1="38" y1="150" x2="92" y2="94"></line>
                <line x1="92" y1="94" x2="150" y2="120"></line>
                <line x1="150" y1="120" x2="205" y2="62"></line>
                <line x1="205" y1="62" x2="274" y2="92"></line>
                <line x1="150" y1="120" x2="186" y2="178"></line>
                <line x1="186" y1="178" x2="246" y2="158"></line>
            </g>

            <g class="constellation-stars">
                <circle cx="38" cy="150" r="3"></circle>
                <circle cx="92" cy="94" r="4"></circle>
                <circle cx="150" cy="120" r="3.5"></circle>
                <circle cx="205" cy="62" r="4"></circle>
                <circle cx="274" cy="92" r="3"></circle>
                <circle cx="186" cy="178" r="3"></circle>
                <circle cx="246" cy="158" r="3.5"></circle>
            </g>
        </svg>
    `;

    nightSky.appendChild(constellation);

    window.setTimeout(() => {
        constellation.classList.add("constellation-visible");
    }, 100);

    window.setTimeout(() => {
        constellation.classList.remove("constellation-visible");
    }, 9000);

    window.setTimeout(() => {
        constellation.remove();
    }, 11000);
}


function scheduleConstellation() {
    const nextDelay =
        Math.random() * 65000 + 40000;

    window.setTimeout(() => {
        const shouldAppear = Math.random() < 0.7;

        if (shouldAppear) {
            createConstellation();
        }

        scheduleConstellation();
    }, nextDelay);
}


function initConstellation() {
    scheduleConstellation();
}


document.addEventListener(
    "DOMContentLoaded",
    initConstellation
);
/* ============================================================
   BOOK PARALLAX
============================================================ */

const book = document.querySelector(".book-placeholder");

if (book) {

    document.addEventListener("mousemove",(e)=>{

        const rect = book.getBoundingClientRect();

        const x =
            (e.clientX-(rect.left+rect.width/2))
            /rect.width;

        const y =
            (e.clientY-(rect.top+rect.height/2))
            /rect.height;

        const rotateY = x*5;
        const rotateX = -y*5;

        book.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-2px)
        `;

    });

    document.addEventListener("mouseleave",()=>{

        book.style.transform=`
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0px)
        `;

    });

}
/* ============================================================
   BOOK CURSOR LIGHT
   A soft highlight follows the mouse across the cover
============================================================ */

function initBookCursorLight() {
    const book = document.querySelector(".book-placeholder");

    if (!book || book.querySelector(".book-cursor-light")) {
        return;
    }

    const light = document.createElement("span");
    light.className = "book-cursor-light";
    light.setAttribute("aria-hidden", "true");

    book.appendChild(light);

    book.addEventListener("mousemove", (event) => {
        const bounds = book.getBoundingClientRect();

        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        light.style.setProperty("--book-light-x", `${x}px`);
        light.style.setProperty("--book-light-y", `${y}px`);

        light.classList.add("visible");
    });

    book.addEventListener("mouseleave", () => {
        light.classList.remove("visible");
    });
}

document.addEventListener(
    "DOMContentLoaded",
    initBookCursorLight
);
/* ============================================================
   RARE F.I.I.A. SURVEILLANCE NOTICE
============================================================ */

function showSurveillanceNotice() {
    if (document.getElementById("surveillance-notice")) {
        return;
    }

    const notice = document.createElement("div");

    notice.id = "surveillance-notice";
    notice.setAttribute("aria-hidden", "true");

    notice.innerHTML = `
        <span>CAMERA 03</span>
        <strong>SUBJECT OBSERVED</strong>
    `;

    document.body.appendChild(notice);

    window.setTimeout(() => {
        notice.classList.add("visible");
    }, 100);

    window.setTimeout(() => {
        notice.classList.remove("visible");
    }, 3200);

    window.setTimeout(() => {
        notice.remove();
    }, 4000);
}


function scheduleSurveillanceNotice() {
    const nextDelay =
        Math.random() * 80000 + 50000;

    window.setTimeout(() => {
        const shouldAppear = Math.random() < 0.55;

        if (shouldAppear) {
            if (typeof runPageFlicker === "function") {
                runPageFlicker();
            }

            window.setTimeout(
                showSurveillanceNotice,
                350
            );
        }

        scheduleSurveillanceNotice();
    }, nextDelay);
}


document.addEventListener(
    "DOMContentLoaded",
    scheduleSurveillanceNotice
);
/* ============================================================
   FLASHLIGHT-REVEALED MESSAGE
============================================================ */

function initFlashlightMessage() {
    const hero = document.getElementById("hero");

    if (!hero || document.querySelector(".flashlight-message")) {
        return;
    }

    const message = document.createElement("span");

    message.className = "flashlight-message";
    message.textContent = "This was not here yesterday.";
    message.setAttribute("aria-hidden", "true");

    hero.appendChild(message);

    document.addEventListener("mousemove", (event) => {
        const bounds = message.getBoundingClientRect();

        const messageX =
            bounds.left + bounds.width / 2;

        const messageY =
            bounds.top + bounds.height / 2;

        const distance = Math.hypot(
            event.clientX - messageX,
            event.clientY - messageY
        );

        const revealDistance = 180;

        const visibility =
            Math.max(
                0,
                1 - distance / revealDistance
            );

        message.style.opacity =
            String(visibility * 0.72);

        message.style.filter =
            `blur(${(1 - visibility) * 3}px)`;
    });

    document.addEventListener("mouseleave", () => {
        message.style.opacity = "0";
    });
}

document.addEventListener(
    "DOMContentLoaded",
    initFlashlightMessage
);
/* ============================================================
   MORE FLASHLIGHT-REVEALED MESSAGES
============================================================ */

function createFlashlightMessage(section, text, className) {
    if (!section || section.querySelector(`.${className}`)) {
        return;
    }

    const message = document.createElement("span");

    message.className = `flashlight-message ${className}`;
    message.textContent = text;
    message.setAttribute("aria-hidden", "true");

    section.appendChild(message);

    document.addEventListener("mousemove", (event) => {
        const bounds = message.getBoundingClientRect();

        const messageX =
            bounds.left + bounds.width / 2;

        const messageY =
            bounds.top + bounds.height / 2;

        const distance = Math.hypot(
            event.clientX - messageX,
            event.clientY - messageY
        );

        const revealDistance = 170;

        const visibility =
            Math.max(
                0,
                1 - distance / revealDistance
            );

        message.style.opacity =
            String(visibility * 0.7);

        message.style.filter =
            `blur(${(1 - visibility) * 3}px)`;
    });

    document.addEventListener("mouseleave", () => {
        message.style.opacity = "0";
    });
}


function initAdditionalFlashlightMessages() {
    createFlashlightMessage(
        document.getElementById("author"),
        "CJ did not write this part.",
        "author-flashlight-message"
    );

    createFlashlightMessage(
        document.getElementById("game"),
        "The classroom is still occupied.",
        "game-flashlight-message"
    );

    createFlashlightMessage(
        document.getElementById("contact"),
        "Someone else is reading this.",
        "contact-flashlight-message"
    );
}


document.addEventListener(
    "DOMContentLoaded",
    initAdditionalFlashlightMessages
);
/* ============================================================
   RETURNING VISITOR
   The archive quietly remembers previous visits
============================================================ */

function initReturningVisitor() {
    const clearanceText =
        document.querySelector("#intro-screen .clearance");

    const enterButton =
        document.getElementById("enter-button");

    if (!clearanceText || !enterButton) {
        return;
    }

    const hasVisitedBefore =
        localStorage.getItem("fiia-archive-visited") === "true";

    if (hasVisitedBefore) {
        clearanceText.textContent = "WELCOME BACK";
    }

    enterButton.addEventListener("click", () => {
        localStorage.setItem(
            "fiia-archive-visited",
            "true"
        );
    });
}

document.addEventListener(
    "DOMContentLoaded",
    initReturningVisitor
);
/* ============================================================
   CLEARANCE-AWARE INTRO
   Rewards visitors who discovered every hidden object
============================================================ */

function initClearanceIntro() {
    const clearanceText =
        document.querySelector("#intro-screen .clearance");

    if (!clearanceText) {
        return;
    }

    const requiredSecrets = [
        "owl",
        "note",
        "coffee",
        "rift"
    ];

    const hasFullClearance =
        requiredSecrets.every((secretName) => {
            return localStorage.getItem(
                `fiia-secret-${secretName}`
            ) === "found";
        });

    if (hasFullClearance) {
        clearanceText.textContent =
            "CLEARANCE CONFIRMED";
    }
}

document.addEventListener(
    "DOMContentLoaded",
    initClearanceIntro
);


