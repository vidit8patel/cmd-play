// Flappy Bird Clone by Cascade
let canvas, ctx, startScreen, gameOverScreen, restartBtn;

// Game constants
const GRAVITY = 0.25;
const FLAP = -4.5;
const BIRD_X = 60;
const BIRD_SIZE = 34;
const GROUND_HEIGHT = 90;
const FPS = 60;

// Game state
let birdY, birdV, score, highScore, gameState, frameCount;

// ---- Question Bank ----
const QUESTIONS = [
    {question: "What is a variable in coding?", options: ["A place to store data", "A kind of animal", "A computer virus"], answer: "A place to store data", difficulty: "easy"},
    {question: "Which of these is a loop?", options: ["for", "cat", "run"], answer: "for", difficulty: "easy"},
    {question: "What does 'if' do in code?", options: ["Makes a decision", "Draws a picture", "Sends an email"], answer: "Makes a decision", difficulty: "easy"},
    {question: "Which is a programming language?", options: ["Python", "Tiger", "Car"], answer: "Python", difficulty: "easy"},
    {question: "What is an algorithm?", options: ["A set of steps to solve a problem", "A type of computer", "A musical instrument"], answer: "A set of steps to solve a problem", difficulty: "easy"},
    {question: "Which is a data type?", options: ["String", "Swing", "Sing"], answer: "String", difficulty: "easy"},
    {question: "What symbol is used for comments in Python?", options: ["#", "$", "@"], answer: "#", difficulty: "easy"},
    {question: "What does 'print' do in code?", options: ["Shows text on screen", "Prints paper", "Saves a file"], answer: "Shows text on screen", difficulty: "easy"},
    {question: "Which is a correct variable name?", options: ["score", "3cats", "my score"], answer: "score", difficulty: "easy"},
    {question: "What is a bug in coding?", options: ["A mistake in the program", "A helpful tool", "A type of food"], answer: "A mistake in the program", difficulty: "easy"},
    {question: "Which is a conditional statement?", options: ["if", "cat", "play"], answer: "if", difficulty: "easy"},
    {question: "What does 'repeat' mean in Scratch?", options: ["Do something again and again", "Stop the program", "Make a sound"], answer: "Do something again and again", difficulty: "easy"},
    {question: "What is a function?", options: ["A reusable piece of code", "A computer virus", "A song"], answer: "A reusable piece of code", difficulty: "medium"},
    {question: "Which is a Boolean value?", options: ["True", "Blue", "Cat"], answer: "True", difficulty: "medium"},
    {question: "What is a string in coding?", options: ["Text", "A rope", "A number"], answer: "Text", difficulty: "medium"},
    {question: "Which is a loop in Scratch?", options: ["forever", "never", "always"], answer: "forever", difficulty: "medium"},
    {question: "What does 'input' mean?", options: ["Data from user", "A new computer", "A picture"], answer: "Data from user", difficulty: "medium"},
    {question: "What is output?", options: ["Data shown to user", "A mouse", "A cable"], answer: "Data shown to user", difficulty: "medium"},
    {question: "Which is a number data type?", options: ["int", "cat", "text"], answer: "int", difficulty: "medium"},
    {question: "What does 'while' do in code?", options: ["Repeats as long as condition is true", "Draws a circle", "Sends a message"], answer: "Repeats as long as condition is true", difficulty: "medium"},
    {question: "What is debugging?", options: ["Fixing errors in code", "Making a game", "Drawing a bug"], answer: "Fixing errors in code", difficulty: "medium"},
    {question: "Which is a list?", options: ["[1,2,3]", "123", "cat"], answer: "[1,2,3]", difficulty: "medium"},
    {question: "What does 'else' mean in code?", options: ["Otherwise", "Start over", "End program"], answer: "Otherwise", difficulty: "medium"},
    {question: "Which is a correct way to start a function in Python?", options: ["def myFunc()", "start myFunc", "func myFunc"], answer: "def myFunc()", difficulty: "medium"},
    {question: "What is indentation?", options: ["Spaces at the start of a line", "A kind of bug", "A color"], answer: "Spaces at the start of a line", difficulty: "medium"},
    {question: "Which is a correct if statement in Python?", options: ["if x > 5:", "if x > 5 then", "if x > 5 do"], answer: "if x > 5:", difficulty: "medium"},
    {question: "What is a comment in code?", options: ["A note for humans", "A command for computer", "A sound"], answer: "A note for humans", difficulty: "medium"},
    {question: "Which is a correct way to start a loop in Python?", options: ["for i in range(5):", "loop 5 times", "repeat 5"], answer: "for i in range(5):", difficulty: "medium"},
    {question: "What is a string method?", options: ["A function for strings", "A bug", "A number"], answer: "A function for strings", difficulty: "hard"},
    {question: "What is a stage in Scratch?", options: ["The background area", "A bug", "A song"], answer: "The background area", difficulty: "hard"},
    {question: "Which is a broadcast in Scratch?", options: ["A way to send messages", "A bug", "A color"], answer: "A way to send messages", difficulty: "hard"},
    {question: "Which is a correct way to start a repeat loop in Scratch?", options: ["repeat 10", "repeat forever", "repeat until"], answer: "repeat 10", difficulty: "hard"},
    {question: "What is an event in coding?", options: ["Something that happens in the program", "A bug", "A color"], answer: "Something that happens in the program", difficulty: "hard"},
    {question: "What is a backdrop in Scratch?", options: ["The background image", "A bug", "A variable"], answer: "The background image", difficulty: "hard"},
    {question: "Which is a correct way to start a new sprite in Scratch?", options: ["Choose a sprite", "Make a bug", "Add a number"], answer: "Choose a sprite", difficulty: "hard"},
    {question: "What is a variable used for in coding?", options: ["To store information", "To draw", "To make sound"], answer: "To store information", difficulty: "hard"},
    {question: "Which is a correct way to change a variable in Scratch?", options: ["set variable to", "change variable to", "make variable"], answer: "set variable to", difficulty: "hard"},
    {question: "Which is a correct way to delete a sprite in Scratch?", options: ["delete this sprite", "remove sprite", "erase sprite"], answer: "delete this sprite", difficulty: "hard"},
    {question: "What is a broadcast used for in Scratch?", options: ["To send messages between scripts", "To make a sound", "To draw"], answer: "To send messages between scripts", difficulty: "hard"},
    {question: "Which is a correct way to start a for loop in Python?", options: ["for i in range(5):", "for i < 5:", "for i = 5"], answer: "for i in range(5):", difficulty: "hard"},
    {question: "What is a module in Python?", options: ["A file with code you can use", "A bug", "A sound"], answer: "A file with code you can use", difficulty: "hard"},
    {question: "Which is a correct way to start a while loop in Python?", options: ["while x < 5:", "while x < 5 do", "while x < 5 then"], answer: "while x < 5:", difficulty: "hard"},
    {question: "What is a syntax error in Python?", options: ["A mistake in code rules", "A bug", "A sound"], answer: "A mistake in code rules", difficulty: "extreme"},
    {question: "What is the output of print('cat' * 2)?", options: ["catcat", "cat2", "cat cat"], answer: "catcat", difficulty: "extreme"},
    {question: "Which is a correct way to check if a list contains an item in Python?", options: ["in", "has", "contains"], answer: "in", difficulty: "extreme"},
    {question: "What is the output of print(len('hello'))?", options: ["5", "4", "6"], answer: "5", difficulty: "extreme"},
    {question: "Which is a correct way to get the first item of a list in Python?", options: ["list[0]", "list[1]", "list[-1]"], answer: "list[0]", difficulty: "extreme"}
];

// --- Difficulty Colors ---
const DIFFICULTY_COLORS = {
    easy: '#4CAF50',      // Green
    medium: '#2196F3',   // Blue
    hard: '#FF9800',     // Orange
    extreme: '#F44336'   // Red
};

// --- Bubble (Option) Logic ---
let bubbles, currentQuestionIdx;
let bubbleSpeed = 1.2; // Slow down bubbles for more reading time
let nextQuestionDelay = 60; // frames to wait (1s at 60fps)
let waitingForNext = 0;

// --- Difficulty Progression ---
function getCurrentDifficulty(score) {
    if (score < 5) return 'easy';
    if (score < 12) return 'medium';
    if (score < 20) return 'hard';
    return 'extreme';
}

function getQuestionsByDifficulty(difficulty) {
    return QUESTIONS.filter(q => q.difficulty === difficulty);
}

// --- Modified nextQuestion ---
function nextQuestion() {
    let difficulty = getCurrentDifficulty(score);
    let availableQuestions = getQuestionsByDifficulty(difficulty);
    if (availableQuestions.length === 0) availableQuestions = QUESTIONS; // fallback
    let qIdx = Math.floor(Math.random() * availableQuestions.length);
    let question = availableQuestions[qIdx];
    currentQuestionIdx = QUESTIONS.indexOf(question);

    // Create bubbles for each option, spaced vertically to avoid overlap
    bubbles = [];
    let opts = [...question.options];
    const spacing = 200; // vertical distance between bubbles (increased)
    const totalHeight = (opts.length - 1) * spacing;
    const centerY = canvas.height / 2;
    for (let i = 0; i < opts.length; i++) {
        let bubble = {
            x: canvas.width + 120,
            y: centerY - totalHeight / 2 + i * spacing,
            r: 60,
            text: opts[i],
            isCorrect: opts[i] === question.answer,
            color: DIFFICULTY_COLORS[question.difficulty] || '#cccccc'
        };
        bubbles.push(bubble);
    }
}

// --- Modified drawBubbles ---
function drawBubbles() {
    bubbles.forEach(bubble => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.shadowColor = '#222';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let words = bubble.text.split(' ');
        let lines = [bubble.text];
        let fontSize = 22;
        let minFontSize = 14;
        let maxWidth = bubble.r * 1.4;
        if (ctx.measureText(bubble.text).width > maxWidth && words.length > 1) {
            // Split into two lines
            let bestSplit = Math.ceil(words.length / 2);
            let line1 = words.slice(0, bestSplit).join(' ');
            let line2 = words.slice(bestSplit).join(' ');
            while ((ctx.measureText(line1).width > maxWidth || ctx.measureText(line2).width > maxWidth) && fontSize > minFontSize) {
                fontSize--;
                ctx.font = `bold ${fontSize}px Arial`;
            }
            lines = [line1, line2];
        }
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${fontSize}px Arial`;
        if (lines.length === 1) {
            ctx.fillText(lines[0], bubble.x, bubble.y + fontSize/8);
        } else {
            let lineSpacing = fontSize + 2;
            ctx.fillText(lines[0], bubble.x, bubble.y - lineSpacing/2 + fontSize/8);
            ctx.fillText(lines[1], bubble.x, bubble.y + lineSpacing/2 + fontSize/8);
        }
    });
}

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    startScreen = document.getElementById('start-screen');
    gameOverScreen = document.getElementById('game-over');
    restartBtn = document.getElementById('restart-btn');
    highScore = Number(localStorage.getItem('flappyHighScore')) || 0;

    canvas.addEventListener('mousedown', flap);
    canvas.addEventListener('touchstart', function(e) { e.preventDefault(); flap(); }, { passive: false });
    startScreen.addEventListener('mousedown', flap);
    startScreen.addEventListener('touchstart', function(e) { e.preventDefault(); flap(); }, { passive: false });
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            flap();
        }
    });
    restartBtn.addEventListener('click', function() {
        resetGame();
    });

    // Load individual images
    const IMAGES = {
        background: new Image(),
        ground: new Image(),
        bird: [new Image(), new Image(), new Image()],
        numbers: []
    };
    function addImageHandlers(img, name, onload) {
        img.onerror = function() {
            console.error('Failed to load image:', img.src);
            if (!document.getElementById('img-error')) {
                let errDiv = document.createElement('div');
                errDiv.id = 'img-error';
                errDiv.style.position = 'absolute';
                errDiv.style.top = '10px';
                errDiv.style.left = '10px';
                errDiv.style.background = 'rgba(255,0,0,0.8)';
                errDiv.style.color = 'white';
                errDiv.style.padding = '10px';
                errDiv.style.zIndex = 9999;
                errDiv.textContent = 'Failed to load required game image: ' + name + '. Check your sprites folder!';
                document.body.appendChild(errDiv);
            }
        };
        img.onload = onload;
    }
    let loaded = 0;
    let total = 3 + 2 + 10; // 3 bird, 2 bg/ground, 10 numbers
    function checkLoaded() {
        loaded++;
        if (loaded >= total) {
            console.log('All images loaded. Starting game.');
            window.IMAGES = IMAGES; // Make globally accessible for other functions
            resetGame();
            gameLoop();
        }
    }
    addImageHandlers(IMAGES.background, 'background-day.png', checkLoaded);
    IMAGES.background.src = 'sprites/background-day.png';
    addImageHandlers(IMAGES.ground, 'base.png', checkLoaded);
    IMAGES.ground.src = 'sprites/base.png';
    addImageHandlers(IMAGES.bird[0], 'bluebird-upflap.png', checkLoaded);
    IMAGES.bird[0].src = 'sprites/bluebird-upflap.png';
    addImageHandlers(IMAGES.bird[1], 'bluebird-midflap.png', checkLoaded);
    IMAGES.bird[1].src = 'sprites/bluebird-midflap.png';
    addImageHandlers(IMAGES.bird[2], 'bluebird-downflap.png', checkLoaded);
    IMAGES.bird[2].src = 'sprites/bluebird-downflap.png';
    for (let i = 0; i < 10; i++) {
        IMAGES.numbers.push(new Image());
        addImageHandlers(IMAGES.numbers[i], i + '.png', checkLoaded);
        IMAGES.numbers[i].src = `sprites/${i}.png`;
    }
    window.IMAGES = IMAGES;
};

function resetGame() {
    birdY = canvas.height / 2 - BIRD_SIZE / 2;
    birdV = 0;
    bubbles = [];
    score = 0;
    frameCount = 0;
    gameState = 'start';
    currentQuestionIdx = 0;
    waitingForNext = 0;
    startScreen.style.display = 'flex';
    gameOverScreen.style.display = 'none';
}

function startGame() {
    console.log('startGame() called');
    gameState = 'playing';
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    nextQuestion();
}

function gameOver() {
    gameState = 'over';
    gameOverScreen.style.display = 'flex';
    if (score > (highScore || 0)) {
        highScore = score;
        localStorage.setItem('flappyHighScore', highScore);
    }
}

function drawBackground() {
    ctx.drawImage(IMAGES.background, 0, 0, canvas.width, canvas.height);
}

function drawGround() {
    const groundY = canvas.height - GROUND_HEIGHT;
    ctx.drawImage(IMAGES.ground, 0, groundY, canvas.width, GROUND_HEIGHT);
}

function drawBird() {
    const birdFrame = Math.floor(frameCount / 7) % 3;
    ctx.drawImage(IMAGES.bird[birdFrame], BIRD_X, birdY, BIRD_SIZE, BIRD_SIZE);
}

function drawBubbles() {
    bubbles.forEach(bubble => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.shadowColor = '#222';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let words = bubble.text.split(' ');
        let lines = [bubble.text];
        let fontSize = 22;
        let minFontSize = 14;
        let maxWidth = bubble.r * 1.4;
        if (ctx.measureText(bubble.text).width > maxWidth && words.length > 1) {
            // Split into two lines
            let bestSplit = Math.ceil(words.length / 2);
            let line1 = words.slice(0, bestSplit).join(' ');
            let line2 = words.slice(bestSplit).join(' ');
            while ((ctx.measureText(line1).width > maxWidth || ctx.measureText(line2).width > maxWidth) && fontSize > minFontSize) {
                fontSize--;
                ctx.font = `bold ${fontSize}px Arial`;
            }
            lines = [line1, line2];
        }
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${fontSize}px Arial`;
        if (lines.length === 1) {
            ctx.fillText(lines[0], bubble.x, bubble.y + fontSize/8);
        } else {
            let lineSpacing = fontSize + 2;
            ctx.fillText(lines[0], bubble.x, bubble.y - lineSpacing/2 + fontSize/8);
            ctx.fillText(lines[1], bubble.x, bubble.y + lineSpacing/2 + fontSize/8);
        }
    });
}

function drawScore() {
    const scoreStr = score.toString();
    let totalWidth = 0;
    for (let i = 0; i < scoreStr.length; i++) {
        totalWidth += 24;
    }
    let x = (canvas.width - totalWidth) / 2;
    for (let i = 0; i < scoreStr.length; i++) {
        const n = Number(scoreStr[i]);
        ctx.drawImage(IMAGES.numbers[n], x, 30, 24, 36);
        x += 24;
    }
}

function update() {
    if (gameState !== 'playing') return;
    birdV += GRAVITY;
    birdY += birdV;
    frameCount++;

    if (waitingForNext > 0) {
        waitingForNext--;
        if (waitingForNext === 0) {
            currentQuestionIdx++;
            nextQuestion();
        }
        return;
    }

    // Move bubbles
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].x -= bubbleSpeed;
    }
    // Remove off-screen bubbles
    if (bubbles.length && bubbles[0].x + bubbles[0].r < 0) {
        // If the correct answer bubble is missed, game over
        if (bubbles.find(b => b.isCorrect && b.x + b.r < 0)) {
            gameOver();
        } else {
            waitingForNext = nextQuestionDelay;
        }
    }
    // Collision detection with bubbles
    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];
        // Bird's bounding box (approximate as circle for simplicity)
        const birdCenter = {x: BIRD_X + BIRD_SIZE/2, y: birdY + BIRD_SIZE/2};
        const dist = Math.sqrt((bubble.x - birdCenter.x) ** 2 + (bubble.y - birdCenter.y) ** 2);
        if (dist < bubble.r + BIRD_SIZE/2) {
            if (bubble.isCorrect) {
                score++;
                currentQuestionIdx++;
                nextQuestion(); // No pause after correct answer
            } else {
                gameOver();
            }
            return;
        }
    }
    // Ground collision
    if (birdY + BIRD_SIZE >= canvas.height - GROUND_HEIGHT) {
        birdY = canvas.height - GROUND_HEIGHT - BIRD_SIZE;
        gameOver();
    }
    // Ceiling collision
    if (birdY < 0) {
        birdY = 0;
        birdV = 0;
    }
}

function render() {
    drawBackground();
    drawGround();
    drawBird();
    drawBubbles();
    drawScore();
    // Draw question at the bottom
    if (gameState === 'playing') {
        ctx.font = 'bold 28px Arial';
        ctx.fillStyle = '#222';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic'; // Use alphabetic for more precise bottom
        const margin = 20;
        const maxWidth = canvas.width * 0.9;
        let question = QUESTIONS[currentQuestionIdx % QUESTIONS.length].question;
        // Word wrap logic
        let words = question.split(' ');
        let lines = [];
        let currentLine = words[0];
        for (let i = 1; i < words.length; i++) {
            let testLine = currentLine + ' ' + words[i];
            if (ctx.measureText(testLine).width > maxWidth) {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);
        // Draw each line, stacking upwards from the bottom margin
        let lineHeight = 34;
        let startY = canvas.height - margin - (lines.length - 1) * lineHeight;
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], canvas.width / 2, startY + i * lineHeight);
        }
    }
    // High score (small, top right)
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 2;
    ctx.strokeText('HI ' + (highScore || 0), canvas.width - 70, 24);
    ctx.fillText('HI ' + (highScore || 0), canvas.width - 70, 24);
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

function flap() {
    console.log('flap() called, gameState:', gameState);
    if (gameState === 'start') {
        startGame();
        birdV = FLAP;
    } else if (gameState === 'playing') {
        birdV = FLAP;
    } else if (gameState === 'over') {
        resetGame();
    }
}
