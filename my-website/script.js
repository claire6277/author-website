/* ============================================================
   CJ MAYLOCK WEBSITE
   THE ENGLISH DEPARTMENT vs. CHAOS AND NONSENSE
   WEBSITE CORE
============================================================ */

/* ============================================================
   GLOBAL VARIABLES
============================================================ */

let secretsFound = 0;

const body = document.body;

const introScreen = document.getElementById("intro-screen");
const enterButton = document.getElementById("enter-button");

const flashlight = document.getElementById("flashlight");

const revealElements = document.querySelectorAll(".reveal");


/* ============================================================
   INTRO SCREEN
============================================================ */

function initIntro() {

    if (!introScreen || !enterButton) return;

    enterButton.addEventListener("click", () => {

        introScreen.classList.add("intro-closing");

        body.classList.add("page-flicker");

        setTimeout(() => {

            introScreen.style.opacity = "0";

        }, 250);

        setTimeout(() => {

            introScreen.style.display = "none";

        }, 900);

    });

}


/* ============================================================
   FLASHLIGHT
============================================================ */

function initFlashlight() {

    if (!flashlight) return;

    document.addEventListener("mousemove", (event) => {

        flashlight.style.left = event.clientX + "px";

        flashlight.style.top = event.clientY + "px";

    });

}


/* ============================================================
   SCROLL REVEAL
============================================================ */

function initRevealAnimations() {

    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {

        threshold: .15

    });

    revealElements.forEach((element) => {

        observer.observe(element);

    });

}


/* ============================================================
   SMOOTH SCROLL LINKS
============================================================ */

function initSmoothScrolling() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const target = document.querySelector(link.getAttribute("href"));

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

}


/* ============================================================
   RANDOM FLICKERS
============================================================ */

function triggerFlicker() {

    body.classList.add("page-flicker");

    setTimeout(() => {

        body.classList.remove("page-flicker");

    }, 650);

}

function initAmbientEvents() {

    const shouldFlicker = Math.random() < 0.40;

    if (!shouldFlicker) return;

    const delay = Math.random() * 65000 + 25000;

    setTimeout(() => {

        triggerFlicker();

    }, delay);

}


/* ============================================================
   INITIALIZE WEBSITE
============================================================ */

function initializeWebsite() {

    initIntro();

    initFlashlight();

    initRevealAnimations();

    initSmoothScrolling();

    initAmbientEvents();

}

document.addEventListener("DOMContentLoaded", initializeWebsite);
/* ============================================================
   HIDDEN DISCOVERIES
============================================================ */

const owl = document.getElementById("secret-owl");
const coffee = document.getElementById("secret-coffee");
const note = document.getElementById("secret-note");
const rift = document.getElementById("secret-rift");


/* ============================================================
   DISCOVERY WINDOW
============================================================ */

let discoveryWindow;

function createDiscoveryWindow() {

    discoveryWindow = document.createElement("div");

    discoveryWindow.id = "discovery-window";

    discoveryWindow.innerHTML = `

        <div class="discovery-card">

            <button id="close-discovery">×</button>

            <h2 id="discovery-title"></h2>

            <p id="discovery-text"></p>

        </div>

    `;

    document.body.appendChild(discoveryWindow);

    discoveryWindow.style.display = "none";

}

function showDiscovery(title, text) {

    document.getElementById("discovery-title").textContent = title;

    document.getElementById("discovery-text").textContent = text;

    discoveryWindow.style.display = "flex";

}

function hideDiscovery() {

    discoveryWindow.style.display = "none";

}


/* ============================================================
   SECRET OBJECTS
============================================================ */

function initSecretObjects() {

    if (owl) {

        owl.addEventListener("click", () => {

            secretsFound++;

            showDiscovery(

                "Observation",

                "The owl watches quietly from the corner of the page. Someone carved F.I.I.A. into the wood beneath it."

            );

        });

    }

    if (coffee) {

        coffee.addEventListener("click", () => {

            secretsFound++;

            showDiscovery(

                "Recovered Note",

                "Sage— Please stop writing 'something weird happened' on incident reports. That is not useful. — Courtney"

            );

        });

    }

    if (note) {

        note.addEventListener("click", () => {

            secretsFound++;

            showDiscovery(

                "Sticky Note",

                "Nathan keeps stealing my pens. I know it's him. He insists he 'found' them."

            );

        });

    }

    if (rift) {

        rift.addEventListener("click", () => {

            secretsFound++;

            triggerFlicker();

            showDiscovery(

                "Anomaly",

                "For just a moment... the page looked different."

            );

        });

    }

}


/* ============================================================
   DISCOVERY EVENTS
============================================================ */

function initDiscoveryWindow() {

    createDiscoveryWindow();

    document.addEventListener("click", (event) => {

        if (event.target.id === "close-discovery") {

            hideDiscovery();

        }

        if (event.target === discoveryWindow) {

            hideDiscovery();

        }

    });

}
/* ============================================================
   DISCOVERY DATABASE
============================================================ */

const discoveries = {

    owl: {

        title: "Observation",

        body: "Someone carved the letters F.I.I.A. beneath the owl. Judging by the wear, it has been there for years."

    },

    coffee: {

        title: "Recovered Note",

        body: "Sage—\n\nPlease stop writing 'something weird happened' on incident reports.\n\nThat is not useful.\n\n— Courtney"

    },

    note: {

        title: "Faculty Reminder",

        body: "Nathan,\n\nWhoever keeps stealing my pens is absolutely not 'borrowing' them.\n\nBring them back.\n\n— Courtney"

    },

    rift: {

        title: "Anomaly",

        body: "For less than a second, the hallway on the other side looked... different."

    }

};


/* ============================================================
   DISCOVERY FUNCTIONS
============================================================ */

function unlockSecret(secretName){

    const secret = discoveries[secretName];

    if(!secret) return;

    secretsFound++;

    triggerFlicker();

    showDiscovery(

        secret.title,

        secret.body

    );

}


/* ============================================================
   SECRET OBJECT EVENTS
============================================================ */

function initSecretObjects(){

    if(owl){

        owl.addEventListener("click",()=>{

            unlockSecret("owl");

        });

    }

    if(coffee){

        coffee.addEventListener("click",()=>{

            unlockSecret("coffee");

        });

    }

    if(note){

        note.addEventListener("click",()=>{

            unlockSecret("note");

        });

    }

    if(rift){

        rift.addEventListener("click",()=>{

            unlockSecret("rift");

        });

    }

}
/* ============================================================
   AMBIENT EVENTS
============================================================ */

const chalkboardMessages = [

    "Today's objective: Stay where you are.",

    "Faculty meeting postponed... indefinitely.",

    "Do not answer the second bell.",

    "Someone forgot something important.",

    "Room occupancy: 31"

];

function randomChalkboardMessage(){

    const board = document.querySelector(".chalkboard");

    if(!board) return;

    const randomIndex = Math.floor(Math.random() * chalkboardMessages.length);

    board.textContent = chalkboardMessages[randomIndex];

}

function ambientFlicker(){

    if(Math.random() < 0.35){

        triggerFlicker();

    }

}

function ambientEvents(){

    setInterval(() => {

        ambientFlicker();

    }, 45000 + Math.random() * 30000);

    setInterval(() => {

        randomChalkboardMessage();

    }, 60000);

}
