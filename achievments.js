/* ============================================================
   ACHIEVEMENTS
   Rewards visitors who discover every hidden object
============================================================ */


/* ============================================================
   SETTINGS
============================================================ */

const achievementSecrets = {
    "secret-owl": "owl",
    "secret-coffee": "coffee",
    "secret-note": "note",
    "secret-rift": "rift"
};

const achievementKey = "fiia-clearance-achievement";


/* ============================================================
   SAVE DISCOVERIES
============================================================ */

function saveAchievementSecret(secretName) {
    const storageKey = `fiia-secret-${secretName}`;

    if (!localStorage.getItem(storageKey)) {
        localStorage.setItem(storageKey, "found");
    }

    checkAchievementProgress();
}


/* ============================================================
   COUNT DISCOVERIES
============================================================ */

function getAchievementProgress() {
    const secretNames = Object.values(achievementSecrets);

    return secretNames.filter((secretName) => {
        return localStorage.getItem(`fiia-secret-${secretName}`) === "found";
    }).length;
}


/* ============================================================
   COMPLETE ACHIEVEMENT
============================================================ */

function unlockClearanceAchievement() {
    if (localStorage.getItem(achievementKey)) {
        return;
    }

    localStorage.setItem(achievementKey, "unlocked");

    if (typeof runPageFlicker === "function") {
        runPageFlicker();
    }

    window.setTimeout(() => {
        if (typeof showDiscovery === "function") {
            showDiscovery(
                "Additional Clearance Granted",
                "F.I.I.A. has recorded your unusual level of curiosity.\n\nYou found everything that was supposed to remain unnoticed.\n\nPlease do not interpret this as permission to continue."
            );
        }
    }, 500);
}


/* ============================================================
   CHECK PROGRESS
============================================================ */

function checkAchievementProgress() {
    const totalSecrets = Object.keys(achievementSecrets).length;
    const foundSecrets = getAchievementProgress();

    if (foundSecrets >= totalSecrets) {
        unlockClearanceAchievement();
    }
}


/* ============================================================
   LISTEN FOR SECRET CLICKS
============================================================ */

function initAchievements() {
    Object.entries(achievementSecrets).forEach(([elementId, secretName]) => {
        const secretElement = document.getElementById(elementId);

        if (!secretElement) {
            return;
        }

        secretElement.addEventListener("click", () => {
            saveAchievementSecret(secretName);
        });
    });

    checkAchievementProgress();
}


/* ============================================================
   INITIALIZE
============================================================ */

document.addEventListener("DOMContentLoaded", initAchievements);
