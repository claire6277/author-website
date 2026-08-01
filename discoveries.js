/* ============================================================
   DISCOVERIES
   Hidden objects and secret documents
============================================================ */

const discoveries = {

    owl: {

        title: "Observation",

        text:
            "Someone carved 'F.I.I.A.' beneath the owl. Judging by the wear, it has been there for years."

    },

    coffee: {

        title: "Recovered Note",

        text:
`Sage—

Please stop writing "something weird happened" on incident reports.

That is not useful.

— Courtney`

    },

    note: {

        title: "Faculty Memo",

        text:
`Nathan,

If you take one more pen from my desk, I'm filing paperwork.

— Courtney`

    },

    rift: {

        title: "Incident Report",

        text:
            "For less than a second, the hallway appeared several feet longer than expected."

    }

};


/* ============================================================
   DISCOVERY WINDOW
============================================================ */

function showDiscovery(title, text){

    const titleElement = document.getElementById("discovery-title");

    const textElement = document.getElementById("discovery-text");

    const windowElement = document.getElementById("discovery-window");

    if(!titleElement || !textElement || !windowElement) return;

    titleElement.textContent = title;

    textElement.textContent = text;

    windowElement.style.display = "flex";

}

function hideDiscovery(){

    const windowElement = document.getElementById("discovery-window");

    if(windowElement){

        windowElement.style.display="none";

    }

}


/* ============================================================
   SECRET OBJECTS
============================================================ */

function initDiscoveries(){

    document.querySelectorAll("[data-secret]").forEach(secret => {

        secret.addEventListener("click",()=>{

            const key = secret.dataset.secret;

            const entry = discoveries[key];

            if(!entry) return;

            showDiscovery(

                entry.title,

                entry.text

            );

        });

    });

}
/* ============================================================
   DISCOVERY WINDOW CREATION
============================================================ */

function createDiscoveryWindow() {

    if (document.getElementById("discovery-window")) {
        return;
    }

    const discoveryWindow = document.createElement("div");

    discoveryWindow.id = "discovery-window";

    discoveryWindow.innerHTML = `

        <div class="discovery-card">

            <button id="close-discovery">&times;</button>

            <h2 id="discovery-title"></h2>

            <p id="discovery-text"></p>

        </div>

    `;

    document.body.appendChild(discoveryWindow);

}


/* ============================================================
   CLOSE EVENTS
============================================================ */

function initDiscoveryCloseButton() {

    document.addEventListener("click", (event) => {

        if (event.target.id === "close-discovery") {

            hideDiscovery();

        }

        if (event.target.id === "discovery-window") {

            hideDiscovery();

        }

    });

}


/* ============================================================
   SECRET COUNTER
============================================================ */

function unlockSecret(secretName) {

    if (!localStorage.getItem(secretName)) {

        localStorage.setItem(secretName, "found");

        secretsFound++;

    }

}


/* ============================================================
   INITIALIZE DISCOVERIES
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    createDiscoveryWindow();

    initDiscoveryCloseButton();

    initDiscoveries();

});
