// Cyber Catcher - Kaboom.js Game
kaboom({
    width: 500,
    height: 700,
    background: [40, 54, 68], // softer blue/gray
    root: document.getElementById("game-container"),
});

const GAME_DURATION = 60; // seconds
const POPUP_INTERVAL = 1.1; // seconds between spawns
const POPUP_LIFETIME = () => rand(2, 3); // seconds
const MAX_STRIKES = 3;

const popupAssets = [
    // Safe
    { emoji: "💌", label: "alerts@yourbank.com", type: "safe", desc: "Legit bank email" },
    { emoji: "🔐", label: "Password: G3@tE_rainB0w!", type: "safe", desc: "Strong password" },
    { emoji: "🧠", label: "URL: https://www.amazon.com", type: "safe", desc: "Real website" },
    // Malicious
    { emoji: "⚠️", label: "support@amaz0n-secure.ru", type: "malicious", desc: "Phishing email" },
    { emoji: "🔐", label: "Password: 123456", type: "malicious", desc: "Weak password" },
    { emoji: "🧠", label: "URL: amaz0n-login.com", type: "malicious", desc: "Fake website" },
    { emoji: "⚠️", label: "phishing@weird-bank.ru", type: "malicious", desc: "Phishing email" },
    { emoji: "🔐", label: "Password: qwerty", type: "malicious", desc: "Weak password" },
    { emoji: "🧠", label: "URL: http://secure-login.amaz0n.ru", type: "malicious", desc: "Fake website" },
    // More safe
    { emoji: "💌", label: "support@amazon.com", type: "safe", desc: "Legit support" },
    { emoji: "🔐", label: "Password: R3@ct_Is#Cool", type: "safe", desc: "Strong password" },
    { emoji: "🧠", label: "URL: https://bankofamerica.com", type: "safe", desc: "Real website" },
];

let score = 0;
let strikes = 0;
let timeLeft = GAME_DURATION;
let threatLevel = 0;
let timerInterval, popupInterval;

function spawnPopup() {
    const item = choose(popupAssets);
    const x = rand(60, width() - 340);
    const y = rand(80, height() - 120);
    const popupWidth = 340;
    const popupHeight = 65;

    // Icon mapping for popup types
    const popupIcons = {
        "malicious-email": "⚠️",
        "safe-email": "✉️",
        "malicious-password": "🔒",
        "safe-password": "🔑",
        "malicious-url": "🧠",
        "safe-url": "🌐",
    };

    let icon = item.emoji;
    if (item.label.startsWith("Password")) {
        icon = item.type === "malicious" ? "🔒" : "🔑";
    } else if (item.label.startsWith("URL")) {
        icon = item.type === "malicious" ? "🧠" : "🌐";
    } else if (item.label.includes("@")) {
        icon = item.type === "malicious" ? "⚠️" : "✉️";
    }

    const popup = add([
        rect(popupWidth, popupHeight, { radius: 16 }),
        color(rgb(245,245,240)),
        outline(4, item.type === "malicious" ? rgb(255, 111, 0) : rgb(120, 180, 120)),
        pos(x, y),
        area(),
        z(100),
        shadow(14),
        "popup",
        { itemType: item.type, clicked: false },
    ]);

    const iconObj = add([
        text(icon, { size: 38 }),
        pos(x + 18, y + 12),
        z(101),
    ]);

    const txt = add([
        text(item.label, {
            size: 24,
            font: "monospace",
            width: popupWidth - 80,
            align: "left",
            lineSpacing: 2,
        }),
        pos(x + 65, y + 20),
        color(rgb(30, 40, 50)),
        z(101),
        area(),
        { parentPopup: popup },
    ]);

    popup.onUpdate(() => {
        if (popup.isHovering()) {
            popup.use(outline(6, item.type === "malicious" ? rgb(255, 180, 120) : rgb(120, 255, 180)));
        } else {
            popup.use(outline(4, item.type === "malicious" ? rgb(255, 111, 0) : rgb(120, 180, 120)));
        }
    });

    popup.onClick(() => {
        if (popup.clicked) return;
        popup.clicked = true;
        destroy(popup);
        destroy(txt);
        if (item.type === "malicious") {
            score++;
            playDing();
        } else {
            score = Math.max(0, score - 1);
            strikes++;
            playBuzz();
        }
        updateUI();
        checkGameOver();
    });

    wait(POPUP_LIFETIME(), () => {
        if (!popup.clicked) {
            if (item.type === "malicious") {
                strikes++;
                playBuzz();
                updateUI();
                checkGameOver();
            }
        }
        destroy(popup);
        destroy(txt);
    });
}

function updateUI() {
    scoreLabel.text = `SCORE: ${score}`;
    strikesLabel.text = `STRIKES: ${"⚠️ ".repeat(strikes)}`;
    timerLabel.text = `TIMER: ${timeLeft < 10 ? "0" : ""}${timeLeft}`;
    riskBar.width = 220 * (strikes / MAX_STRIKES);
    riskBar.color = rgb(255, 61, 61);
} 

function checkGameOver() {
    if (strikes >= MAX_STRIKES) {
        endGame(false);
    }
}

function endGame(win) {
    every("popup", (p) => destroy(p));
    scoreLabel.text = win ? `You Win! Score: ${score}` : `Game Over! Score: ${score}`;
    add([
        text(win ? "Great job!" : "Try again & learn!", { size: 36 }),
        pos(width() / 2 - 120, height() / 2 - 40),
        color(rgb(255, 255, 255)),
        z(999),
    ]);
    clearInterval(timerInterval);
    clearInterval(popupInterval);
}

function playDing() {
    // Simple beep for correct
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = 880;
    o.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.1);
}
function playBuzz() {
    // Simple buzz for wrong
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    o.type = "square";
    o.frequency.value = 120;
    o.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.18);
}

// Card background (must be drawn first and behind everything)
add([
    rect(width() - 60, height() - 60, { radius: 30 }),
    pos(30, 30),
    color(50, 60, 75),
    opacity(0.97),
    z(-10),
    outline(4, rgb(40,40,40)),
    "game-bg",
]);

// Title
add([
    text("CYBER CATCHER", { size: 48, font: "monospace", width: width()-40, align: "center" }),
    pos(0, 22),
    color(rgb(142, 210, 255)),
    z(201),
]);

// UI
const scoreLabel = add([
    text("SCORE: 0", { size: 30, font: "monospace", width: 180 }),
    pos(30, 600),
    color(rgb(255,255,255)),
    z(200),
]);
const timerLabel = add([
    text(`TIMER: ${GAME_DURATION < 10 ? '0' : ''}${GAME_DURATION}`, { size: 30, font: "monospace", width: 180 }),
    pos(260, 600),
    color(rgb(255,255,255)),
    z(200),
]);
const strikesLabel = add([
    text("STRIKES: ", { size: 30, font: "monospace" }),
    pos(30, 650),
    color(rgb(255, 255, 255)),
    z(200),
]);
const riskLabel = add([
    text("RISK", { size: 30, font: "monospace" }),
    pos(260, 650),
    color(rgb(255,255,255)),
    z(200),
]);
const riskBarBg = add([
    rect(220, 22, { radius: 8 }),
    pos(width()/2 - 110, 560),
    color(rgb(220,220,220)),
    z(190),
]);
const riskBar = add([
    rect(0, 22, { radius: 8 }),
    pos(width()/2 - 110, 560),
    color(rgb(255, 61, 61)),
    z(191),
]);

function startGame() {
    score = 0;
    strikes = 0;
    timeLeft = GAME_DURATION;
    updateUI();
    timerInterval = setInterval(() => {
        timeLeft--;
        timerLabel.text = `Timer: ${timeLeft < 10 ? "0" : ""}${timeLeft}`;
        if (timeLeft <= 0) {
            endGame(true);
        }
    }, 1000);
    popupInterval = setInterval(spawnPopup, POPUP_INTERVAL * 1000);
}

startGame();
