/* ============================================================
   AMBIENT EVENTS
   Quiet background effects for the CJ Maylock website
============================================================ */


/* ============================================================
   HELPERS
============================================================ */

function triggerAmbientFlicker() {
    document.body.classList.add("page-flicker");

    window.setTimeout(() => {
        document.body.classList.remove("page-flicker");
    }, 650);
}


/* ============================================================
   RANDOM FLICKER
============================================================ */

function scheduleRandomFlicker() {
    const minimumDelay = 25000;
    const maximumDelay = 90000;

    const nextDelay =
        Math.random() * (maximumDelay - minimumDelay) + minimumDelay;

    window.setTimeout(() => {
        const shouldFlicker = Math.random() < 0.45;

        if (shouldFlicker) {
            triggerAmbientFlicker();
        }

        scheduleRandomFlicker();
    }, nextDelay);
}


/* ============================================================
   PAGE VISIBILITY EFFECT
============================================================ */

function initReturnFlicker() {
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && Math.random() < 0.35) {
            window.setTimeout(triggerAmbientFlicker, 250);
        }
    });
}


/* ============================================================
   INITIALIZE
============================================================ */

function initAmbientEffects() {
    scheduleRandomFlicker();
    initReturnFlicker();
}

document.addEventListener("DOMContentLoaded", initAmbientEffects);
