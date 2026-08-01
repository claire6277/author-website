/* ============================================================
   ESCAPE THE CLASSROOM
   GAME.JS
============================================================ */

/* ============================================================
   GAME ELEMENTS
============================================================ */

const playGameButton = document.getElementById("play-game");
const gameOverlay = document.getElementById("game-overlay");

const restartGameButton = document.getElementById("restart-game");
const closeGameButton = document.getElementById("close-game");
const returnFromGameButton = document.getElementById("return-from-game");
const playAgainButton = document.getElementById("play-again");

const beginGameButton = document.getElementById("begin-game");

const classroom = document.getElementById("classroom");

const gameObjectiveText =
    document.getElementById("game-objective-text");

const gameLogContent =
    document.getElementById("game-log-content");

const inventoryKey =
    document.getElementById("inventory-key");

const inventoryCode =
    document.getElementById("inventory-code");

const inventoryBadge =
    document.getElementById("inventory-badge");

const gameStartScreen =
    document.getElementById("game-start-screen");

const gameNoteScreen =
    document.getElementById("game-note-screen");

const gameKeypadScreen =
    document.getElementById("game-keypad-screen");

const gameEndingScreen =
    document.getElementById("game-ending-screen");

const gameNoteLabel =
    document.getElementById("game-note-label");

const gameNoteTitle =
    document.getElementById("game-note-title");

const gameNoteText =
    document.getElementById("game-note-text");

const closeGameNoteButton =
    document.getElementById("close-game-note");

const closeKeypadButton =
    document.getElementById("close-keypad");

const keypadDisplay =
    document.getElementById("keypad-display");

const classroomBoardTitle =
    document.getElementById("classroom-board-title");

const classroomBoardMessage =
    document.getElementById("classroom-board-message");

const classroomWhisper =
    document.getElementById("classroom-whisper");

const classroomPoster =
    document.getElementById("classroom-poster");

const classroomClock =
    document.getElementById("classroom-clock");

const classroomChalkboard =
    document.getElementById("classroom-chalkboard");

const classroomDoor =
    document.getElementById("classroom-door");

const gameCoffee =
    document.getElementById("game-coffee");

const gamePapers =
    document.getElementById("game-papers");

const gameBook =
    document.getElementById("game-book");

const filingDrawers =
    document.querySelectorAll(".filing-drawer");


/* ============================================================
   GAME STATE
============================================================ */

let gameStarted = false;

let hasKey = false;
let hasCode = false;
let hasBadge = false;

let enteredCode = "";

let secondBellTimer;

const correctCode = "3417";


/* ============================================================
   BASIC EFFECTS
============================================================ */

function flickerClassroom() {

    if (!classroom) return;

    classroom.classList.remove("flicker");

    void classroom.offsetWidth;

    classroom.classList.add("flicker");

    setTimeout(() => {

        classroom.classList.remove("flicker");

    }, 900);

}

function shakeClassroom() {

    if (!classroom) return;

    classroom.classList.remove("shake");

    void classroom.offsetWidth;

    classroom.classList.add("shake");

    setTimeout(() => {

        classroom.classList.remove("shake");

    }, 500);

}
/* ============================================================
   GAME LOG
============================================================ */

function addGameLog(message, time = "17:03") {

    if (!gameLogContent) return;

    const entry = document.createElement("div");

    entry.className = "game-log-entry";

    const timeElement = document.createElement("strong");

    timeElement.textContent = time;

    entry.appendChild(timeElement);

    entry.appendChild(
        document.createTextNode(` ${message}`)
    );

    gameLogContent.prepend(entry);

}


/* ============================================================
   DISCOVERY SCREEN
============================================================ */

function showGameNote(label, title, text) {

    if (
        !gameNoteLabel ||
        !gameNoteTitle ||
        !gameNoteText ||
        !gameNoteScreen
    ) {
        return;
    }

    gameNoteLabel.textContent = label;

    gameNoteTitle.textContent = title;

    gameNoteText.textContent = text;

    gameNoteScreen.classList.remove("hidden");

}

function hideGameNote() {

    if (!gameNoteScreen) return;

    gameNoteScreen.classList.add("hidden");

}


/* ============================================================
   OBJECTIVE
============================================================ */

function updateGameObjective() {

    if (!gameObjectiveText) return;

    if (!hasCode) {

        gameObjectiveText.textContent =
            "Find the classroom exit code.";

        return;

    }

    if (!hasKey) {

        gameObjectiveText.textContent =
            "Find the key hidden in the room.";

        return;

    }

    if (!hasBadge) {

        gameObjectiveText.textContent =
            "Find the F.I.I.A. badge.";

        return;

    }

    gameObjectiveText.textContent =
        "Unlock the door before the second bell.";

}


/* ============================================================
   INVENTORY
============================================================ */

function fillInventorySlot(slot, value) {

    if (!slot) return;

    slot.textContent = value;

    slot.classList.add("filled");

}

function clearInventorySlot(slot) {

    if (!slot) return;

    slot.textContent = "—";

    slot.classList.remove("filled");

}


/* ============================================================
   RESET GAME
============================================================ */

function resetGame() {

    gameStarted = false;

    hasKey = false;
    hasCode = false;
    hasBadge = false;

    enteredCode = "";

    clearTimeout(secondBellTimer);

    if (gameObjectiveText) {

        gameObjectiveText.textContent =
            "Inspect the classroom.";

    }

    if (gameLogContent) {

        gameLogContent.innerHTML = "";

    }

    clearInventorySlot(inventoryKey);
    clearInventorySlot(inventoryCode);
    clearInventorySlot(inventoryBadge);

    if (classroomBoardTitle) {

        classroomBoardTitle.textContent =
            "Today’s Objective";

    }

    if (classroomBoardMessage) {

        classroomBoardMessage.textContent =
            "Remain calm until help arrives.";

    }

    if (classroomWhisper) {

        classroomWhisper.textContent =
            "you stayed too late";

    }

    filingDrawers.forEach((drawer) => {

        drawer.classList.remove("open");

    });

    if (classroom) {

        classroom.classList.remove(
            "dark",
            "flicker",
            "shake"
        );

    }

    if (gameStartScreen) {

        gameStartScreen.classList.remove("hidden");

    }

    if (gameNoteScreen) {

        gameNoteScreen.classList.add("hidden");

    }

    if (gameKeypadScreen) {

        gameKeypadScreen.classList.add("hidden");

    }

    if (gameEndingScreen) {

        gameEndingScreen.classList.add("hidden");

    }

    if (keypadDisplay) {

        keypadDisplay.textContent = "----";

    }

}


/* ============================================================
   OPEN AND CLOSE GAME
============================================================ */

function openGame() {

    if (!gameOverlay) return;

    gameOverlay.classList.add("open");

    gameOverlay.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

    resetGame();

    if (typeof runPageFlicker === "function") {

        runPageFlicker();

    }

}

function closeGame() {

    if (!gameOverlay) return;

    gameOverlay.classList.remove("open");

    gameOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

    clearTimeout(secondBellTimer);

}


/* ============================================================
   BEGIN SCENARIO
============================================================ */

function beginScenario() {

    gameStarted = true;

    if (gameStartScreen) {

        gameStartScreen.classList.add("hidden");

    }

    if (gameObjectiveText) {

        gameObjectiveText.textContent =
            "Find the classroom exit code.";

    }

    addGameLog(
        "After-dismissal protocol initiated."
    );

    addGameLog(
        "The classroom door has locked automatically."
    );

    secondBellTimer = setTimeout(() => {

        flickerClassroom();

        if (classroomBoardMessage) {

            classroomBoardMessage.textContent =
                "Do not answer the second bell.";

        }

        if (classroomWhisper) {

            classroomWhisper.textContent =
                "it knows you are still here";

        }

        addGameLog(
            "A second bell sounded from somewhere inside the room.",
            "17:11"
        );

    }, 24000);

}
/* ============================================================
   CLASSROOM OBJECTS
============================================================ */

function inspectPoster() {

    if (!gameStarted) return;

    flickerClassroom();

    showGameNote(
        "Northdown Staff Notice",
        "The second bell does not indicate dismissal.",
        "If you hear it after the building closes, remain inside the nearest classroom and do not look into the hallway."
    );

    addGameLog(
        "The poster appears newer than the wall beneath it.",
        "17:05"
    );

}


function inspectClock() {

    if (!gameStarted) return;

    showGameNote(
        "Clock Inspection",
        "The clock has thirteen marks.",
        "The hands point to 3 and 17. You write down 3417 before the extra mark disappears."
    );

    if (!hasCode) {

        hasCode = true;

        fillInventorySlot(
            inventoryCode,
            "3417"
        );

        addGameLog(
            "Exit code recorded: 3417.",
            "17:06"
        );

        updateGameObjective();

    }

}


function inspectCoffee() {

    if (!gameStarted) return;

    showGameNote(
        "Nathan’s Mug",
        "THIS COUNTS AS HYDRATION.",
        "The coffee is still warm. Nathan left hours ago."
    );

    flickerClassroom();

    addGameLog(
        "Coffee temperature inconsistent with elapsed time.",
        "17:07"
    );

}


function inspectPapers() {

    if (!gameStarted) return;

    showGameNote(
        "Passive-Aggressive Faculty Note",
        "Sage—",
        "If you are going to keep using the emergency forms as coasters, at least stop circling “unknown entity” in coffee. — Courtney"
    );

    addGameLog(
        "Faculty communication recovered from the teacher desk.",
        "17:08"
    );

}


function inspectBook() {

    if (!gameStarted) return;

    flickerClassroom();

    if (!hasBadge) {

        hasBadge = true;

        fillInventorySlot(
            inventoryBadge,
            "◉"
        );

        updateGameObjective();

        showGameNote(
            "Recovered Object",
            "F.I.I.A. Badge",
            "An owl with three eyes grips a snake beneath the agency initials. It was hidden inside the book."
        );

        addGameLog(
            "F.I.I.A. identification recovered.",
            "17:09"
        );

        return;

    }

    showGameNote(
        "Book Inspection",
        "The page number changed.",
        "The sentence on the page reads: “The room is waiting for you to leave.”"
    );

}


function inspectChalkboard() {

    if (!gameStarted) return;

    flickerClassroom();

    if (classroomBoardMessage) {

        classroomBoardMessage.textContent =
            "You were not supposed to stay.";

    }

    if (classroomWhisper) {

        classroomWhisper.textContent =
            "turn around";

    }

    addGameLog(
        "Chalkboard message altered without contact.",
        "17:09"
    );

}


/* ============================================================
   FILING CABINET
============================================================ */

const drawerMessages = [

    "Empty folders labeled with dates that have not happened yet.",

    "A stack of disciplinary referrals signed by nobody.",

    "The drawer smells faintly like rain.",

    "A class roster with one extra name."

];


function inspectDrawer(drawer) {

    if (!gameStarted) return;

    const drawerNumber =
        Number(drawer.dataset.drawer);

    drawer.classList.toggle("open");

    if (drawerNumber === 2 && !hasKey) {

        hasKey = true;

        fillInventorySlot(
            inventoryKey,
            "🔑"
        );

        updateGameObjective();

        showGameNote(
            "Recovered Object",
            "Small Brass Key",
            "The key is taped beneath the third drawer. The tape is still sticky."
        );

        addGameLog(
            "Door key recovered from filing cabinet.",
            "17:10"
        );

        flickerClassroom();

        return;

    }

    showGameNote(
        "Filing Cabinet",
        "Nothing useful.",
        drawerMessages[drawerNumber]
    );

    addGameLog(
        "Filing drawer inspected. No approved materials found.",
        "17:10"
    );

}
/* ============================================================
   DOOR
============================================================ */

function inspectDoor() {

    if (!gameStarted) return;

    if (!hasKey) {

        shakeClassroom();

        showGameNote(
            "Exit Attempt",
            "The handle will not move.",
            "Something on the other side moves at exactly the same time."
        );

        addGameLog(
            "Door remains locked. Mechanical key required.",
            "17:12"
        );

        return;
    }

    if (!hasBadge) {

        showGameNote(
            "Exit Attempt",
            "The lock released. The door did not.",
            "A small reader beside the frame flashes: AUTHORIZATION REQUIRED."
        );

        addGameLog(
            "F.I.I.A. authorization required.",
            "17:12"
        );

        return;
    }

    if (!hasCode) {

        showGameNote(
            "Exit Attempt",
            "The keypad wakes.",
            "You do not know the code."
        );

        addGameLog(
            "Four-digit exit code required.",
            "17:12"
        );

        return;
    }

    if (gameKeypadScreen) {

        gameKeypadScreen.classList.remove("hidden");
    }

    enteredCode = "";

    if (keypadDisplay) {

        keypadDisplay.textContent = "----";
    }

}


/* ============================================================
   KEYPAD
============================================================ */

function updateKeypadDisplay() {

    if (!keypadDisplay) return;

    keypadDisplay.textContent =
        enteredCode.padEnd(4, "-");

}


function submitKeypadCode() {

    if (enteredCode === correctCode) {

        if (gameKeypadScreen) {

            gameKeypadScreen.classList.add("hidden");
        }

        if (gameEndingScreen) {

            gameEndingScreen.classList.remove("hidden");
        }

        clearTimeout(secondBellTimer);

        flickerClassroom();

        if (classroom) {

            classroom.classList.add("dark");
        }

        const endingText =
            document.getElementById("game-ending-text");

        if (endingText) {

            endingText.textContent =
                "You unlocked the classroom. Beyond the door, Hallway C is several hundred feet longer than it was this morning.";
        }

        addGameLog(
            "Exit code accepted.",
            "17:13"
        );

        addGameLog(
            "Classroom door opened. Hallway dimensions inconsistent.",
            "17:13"
        );

        return;
    }

    shakeClassroom();

    flickerClassroom();

    addGameLog(
        "Incorrect code entered. Something knocked twice.",
        "17:13"
    );

    enteredCode = "";

    updateKeypadDisplay();

}


function handleKeypadButton(event) {

    const value =
        event.target.textContent.trim();

    if (value === "CLR") {

        enteredCode = "";

        updateKeypadDisplay();

        return;
    }

    if (value === "OK") {

        submitKeypadCode();

        return;
    }

    if (enteredCode.length < 4) {

        enteredCode += value;

        updateKeypadDisplay();
    }

}
/* ============================================================
   EVENT LISTENERS
============================================================ */

if (playGameButton) {
    playGameButton.addEventListener(
        "click",
        openGame
    );
}

if (closeGameButton) {
    closeGameButton.addEventListener(
        "click",
        closeGame
    );
}

if (returnFromGameButton) {
    returnFromGameButton.addEventListener(
        "click",
        closeGame
    );
}

if (restartGameButton) {
    restartGameButton.addEventListener(
        "click",
        resetGame
    );
}

if (playAgainButton) {
    playAgainButton.addEventListener(
        "click",
        resetGame
    );
}

if (beginGameButton) {
    beginGameButton.addEventListener(
        "click",
        beginScenario
    );
}

if (closeGameNoteButton) {
    closeGameNoteButton.addEventListener(
        "click",
        hideGameNote
    );
}

if (closeKeypadButton) {
    closeKeypadButton.addEventListener(
        "click",
        () => {
            if (gameKeypadScreen) {
                gameKeypadScreen.classList.add("hidden");
            }

            enteredCode = "";

            updateKeypadDisplay();
        }
    );
}

if (classroomPoster) {
    classroomPoster.addEventListener(
        "click",
        inspectPoster
    );
}

if (classroomClock) {
    classroomClock.addEventListener(
        "click",
        inspectClock
    );
}

if (gameCoffee) {
    gameCoffee.addEventListener(
        "click",
        inspectCoffee
    );
}

if (gamePapers) {
    gamePapers.addEventListener(
        "click",
        inspectPapers
    );
}

if (gameBook) {
    gameBook.addEventListener(
        "click",
        inspectBook
    );
}

if (classroomChalkboard) {
    classroomChalkboard.addEventListener(
        "click",
        inspectChalkboard
    );
}

if (classroomDoor) {
    classroomDoor.addEventListener(
        "click",
        inspectDoor
    );
}

filingDrawers.forEach((drawer) => {
    drawer.addEventListener(
        "click",
        () => inspectDrawer(drawer)
    );
});

document
    .querySelectorAll("#keypad-buttons button")
    .forEach((button) => {
        button.addEventListener(
            "click",
            handleKeypadButton
        );
    });

document.addEventListener(
    "keydown",
    (event) => {
        const gameIsOpen =
            gameOverlay &&
            gameOverlay.classList.contains("open");

        if (event.key === "Escape" && gameIsOpen) {
            closeGame();
        }
    }
);


/* ============================================================
   INITIAL STATE
============================================================ */

resetGame();
