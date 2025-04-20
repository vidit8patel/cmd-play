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
<<<<<<< HEAD
=======
    // Easy
>>>>>>> 6709209 (Update Flappy Bird submodule and ensure latest changes are included.)
    {question: "What is a variable in coding?", options: ["A place to store data", "A kind of animal", "A computer virus"], answer: "A place to store data", difficulty: "easy"},
    {question: "Which of these is a loop?", options: ["for", "cat", "run"], answer: "for", difficulty: "easy"},
    {question: "What does 'if' do in code?", options: ["Makes a decision", "Draws a picture", "Sends an email"], answer: "Makes a decision", difficulty: "easy"},
    {question: "Which is a programming language?", options: ["Python", "Tiger", "Car"], answer: "Python", difficulty: "easy"},
    {question: "What is an algorithm?", options: ["A set of steps to solve a problem", "A type of computer", "A musical instrument"], answer: "A set of steps to solve a problem", difficulty: "easy"},
<<<<<<< HEAD
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
=======
    // Medium
    {question: "What symbol is used for comments in Python?", options: ["#", "$", "@"], answer: "#", difficulty: "medium"},
    {question: "Which is a data type?", options: ["String", "Swing", "Sing"], answer: "String", difficulty: "medium"},
    {question: "What does 'print' do in code?", options: ["Shows text on screen", "Prints paper", "Saves a file"], answer: "Shows text on screen", difficulty: "medium"},
    {question: "Which is a correct variable name?", options: ["score", "3cats", "my score"], answer: "score", difficulty: "medium"},
    {question: "What is a bug in coding?", options: ["A mistake in the program", "A helpful tool", "A type of food"], answer: "A mistake in the program", difficulty: "medium"},
    // Hard
    {question: "Which is a conditional statement?", options: ["if", "cat", "play"], answer: "if", difficulty: "hard"},
    {question: "What does 'repeat' mean in Scratch?", options: ["Do something again and again", "Stop the program", "Make a sound"], answer: "Do something again and again", difficulty: "hard"},
    {question: "What is a function?", options: ["A reusable piece of code", "A computer virus", "A song"], answer: "A reusable piece of code", difficulty: "hard"},
    {question: "Which is a Boolean value?", options: ["True", "Blue", "Cat"], answer: "True", difficulty: "hard"},
    {question: "What is a string in coding?", options: ["Text", "A rope", "A number"], answer: "Text", difficulty: "hard"},
    // Extreme
    {question: "Which is a loop in Scratch?", options: ["forever", "never", "always"], answer: "forever", difficulty: "extreme"},
    {question: "What does 'input' mean?", options: ["Data from user", "A new computer", "A picture"], answer: "Data from user", difficulty: "extreme"},
    {question: "What is output?", options: ["Data shown to user", "A mouse", "A cable"], answer: "Data shown to user", difficulty: "extreme"},
    {question: "Which is a number data type?", options: ["int", "cat", "text"], answer: "int", difficulty: "extreme"},
    {question: "What does 'while' do in code?", options: ["Repeats as long as condition is true", "Draws a circle", "Sends a message"], answer: "Repeats as long as condition is true", difficulty: "extreme"},
    {question: "What is a variable in coding?", options: ["A place to store data", "A kind of animal", "A computer virus"], answer: "A place to store data"},
    {question: "Which of these is a loop?", options: ["for", "cat", "run"], answer: "for"},
    {question: "What does 'if' do in code?", options: ["Makes a decision", "Draws a picture", "Sends an email"], answer: "Makes a decision"},
    {question: "Which is a programming language?", options: ["Python", "Tiger", "Car"], answer: "Python"},
    {question: "What is an algorithm?", options: ["A set of steps to solve a problem", "A type of computer", "A musical instrument"], answer: "A set of steps to solve a problem"},
    {question: "Which is a data type?", options: ["String", "Swing", "Sing"], answer: "String"},
    {question: "What symbol is used for comments in Python?", options: ["#", "$", "@"], answer: "#"},
    {question: "What does 'print' do in code?", options: ["Shows text on screen", "Prints paper", "Saves a file"], answer: "Shows text on screen"},
    {question: "Which is a correct variable name?", options: ["score", "3cats", "my score"], answer: "score"},
    {question: "What is a bug in coding?", options: ["A mistake in the program", "A helpful tool", "A type of food"], answer: "A mistake in the program"},
    {question: "Which is a conditional statement?", options: ["if", "cat", "play"], answer: "if"},
    {question: "What does 'repeat' mean in Scratch?", options: ["Do something again and again", "Stop the program", "Make a sound"], answer: "Do something again and again"},
    {question: "What is a function?", options: ["A reusable piece of code", "A computer virus", "A song"], answer: "A reusable piece of code"},
    {question: "Which is a Boolean value?", options: ["True", "Blue", "Cat"], answer: "True"},
    {question: "What is a string in coding?", options: ["Text", "A rope", "A number"], answer: "Text"},
    {question: "Which is a loop in Scratch?", options: ["forever", "never", "always"], answer: "forever"},
    {question: "What does 'input' mean?", options: ["Data from user", "A new computer", "A picture"], answer: "Data from user"},
    {question: "What is output?", options: ["Data shown to user", "A mouse", "A cable"], answer: "Data shown to user"},
    {question: "Which is a number data type?", options: ["int", "cat", "text"], answer: "int"},
    {question: "What does 'while' do in code?", options: ["Repeats as long as condition is true", "Draws a circle", "Sends a message"], answer: "Repeats as long as condition is true"},
    {question: "What is debugging?", options: ["Fixing errors in code", "Making a game", "Drawing a bug"], answer: "Fixing errors in code"},
    {question: "Which is a list?", options: ["[1,2,3]", "123", "cat"], answer: "[1,2,3]"},
    {question: "What does 'else' mean in code?", options: ["Otherwise", "Start over", "End program"], answer: "Otherwise"},
    {question: "Which is a correct way to start a function in Python?", options: ["def myFunc()", "start myFunc", "func myFunc"], answer: "def myFunc()"},
    {question: "What is indentation?", options: ["Spaces at the start of a line", "A kind of bug", "A color"], answer: "Spaces at the start of a line"},
    {question: "Which is a correct if statement in Python?", options: ["if x > 5:", "if x > 5 then", "if x > 5 do"], answer: "if x > 5:"},
    {question: "What is a comment in code?", options: ["A note for humans", "A command for computer", "A sound"], answer: "A note for humans"},
    {question: "Which is a correct way to start a loop in Python?", options: ["for i in range(5):", "loop 5 times", "repeat 5"], answer: "for i in range(5):"},
    {question: "What does 'break' do in a loop?", options: ["Stops the loop", "Starts the loop", "Prints a message"], answer: "Stops the loop"},
    {question: "Which is a correct way to check equality in Python?", options: ["==", "=", ":="], answer: "=="},
    {question: "What is a syntax error?", options: ["A mistake in code rules", "A computer virus", "A sound error"], answer: "A mistake in code rules"},
    {question: "Which is a correct string?", options: ["'hello'", "hello", "1234"], answer: "'hello'"},
    {question: "What is a loop used for?", options: ["Repeat actions", "Draw pictures", "Make music"], answer: "Repeat actions"},
    {question: "Which is a correct way to get input in Python?", options: ["input()", "get()", "scan()"], answer: "input()"},
    {question: "What does 'int' mean?", options: ["Integer number", "Interesting", "Inside"], answer: "Integer number"},
    {question: "Which is a correct way to print in Python?", options: ["print('Hello')", "show('Hello')", "display('Hello')"], answer: "print('Hello')"},
    {question: "What is a loop variable?", options: ["A variable that changes in a loop", "A bug", "A color"], answer: "A variable that changes in a loop"},
    {question: "Which is a correct Boolean value?", options: ["False", "Fail", "File"], answer: "False"},
    {question: "What is a function call?", options: ["Using a function", "Making a phone call", "Printing"], answer: "Using a function"},
    {question: "Which is a correct way to start a while loop in Python?", options: ["while x < 5:", "while x < 5 do", "while x < 5 then"], answer: "while x < 5:"},
    {question: "What is a parameter?", options: ["A value given to a function", "A bug", "A number"], answer: "A value given to a function"},
    {question: "Which is a correct way to start a list in Python?", options: ["[ ]", "{ }", "( )"], answer: "[ ]"},
    {question: "What is an index in a list?", options: ["A position number", "A bug", "A color"], answer: "A position number"},
    {question: "Which is a correct way to get the length of a list in Python?", options: ["len(list)", "length(list)", "count(list)"], answer: "len(list)"},
    {question: "What is a string method?", options: ["A function for strings", "A bug", "A number"], answer: "A function for strings"},
    {question: "Which is a correct way to add to a list in Python?", options: ["list.append(x)", "list.add(x)", "list.push(x)"], answer: "list.append(x)"},
    {question: "What is a return value?", options: ["The result from a function", "A bug", "A color"], answer: "The result from a function"},
    {question: "Which is a correct way to import a module in Python?", options: ["import math", "get math", "add math"], answer: "import math"},
    {question: "What is a flowchart?", options: ["A diagram showing steps", "A type of bug", "A song"], answer: "A diagram showing steps"},
    {question: "Which is a correct way to start a comment in Python?", options: ["#", "//", "--"], answer: "#"},
    {question: "What does GUI stand for?", options: ["Graphical User Interface", "Great Useful Internet", "Game User Input"], answer: "Graphical User Interface"},
    {question: "What is Scratch?", options: ["A block-based coding language", "A computer virus", "A game"], answer: "A block-based coding language"},
    {question: "Which is a sprite in Scratch?", options: ["A character or object", "A bug", "A number"], answer: "A character or object"},
    {question: "What is a stage in Scratch?", options: ["The background area", "A bug", "A song"], answer: "The background area"},
    {question: "Which is a broadcast in Scratch?", options: ["A way to send messages", "A bug", "A color"], answer: "A way to send messages"},
    {question: "What is a forever loop in Scratch?", options: ["Repeats forever", "Repeats once", "Repeats 5 times"], answer: "Repeats forever"},
    {question: "Which is a variable in Scratch?", options: ["A place to store data", "A bug", "A color"], answer: "A place to store data"},
    {question: "What is a script in Scratch?", options: ["A set of blocks", "A bug", "A number"], answer: "A set of blocks"},
    {question: "Which is a conditional in Scratch?", options: ["if", "cat", "move"], answer: "if"},
    {question: "What does 'wait' do in Scratch?", options: ["Pauses the script", "Draws a line", "Starts a loop"], answer: "Pauses the script"},
    {question: "What is a bug in Scratch?", options: ["A mistake in the project", "A sprite", "A sound"], answer: "A mistake in the project"},
    {question: "Which is a correct way to start a forever loop in Scratch?", options: ["forever", "repeat", "always"], answer: "forever"},
    {question: "What does 'set x to 0' do in Scratch?", options: ["Moves sprite to left edge", "Changes color", "Says hello"], answer: "Moves sprite to left edge"},
    {question: "Which is a correct way to start a repeat loop in Scratch?", options: ["repeat 10", "repeat forever", "repeat until"], answer: "repeat 10"},
    {question: "What is an event in coding?", options: ["Something that happens in the program", "A bug", "A color"], answer: "Something that happens in the program"},
    {question: "Which is a correct way to start a program in Scratch?", options: ["when green flag clicked", "start program", "run code"], answer: "when green flag clicked"},
    {question: "What is a stage in coding?", options: ["The area where sprites move", "A bug", "A color"], answer: "The area where sprites move"},
    {question: "Which is a correct way to move a sprite in Scratch?", options: ["move 10 steps", "walk 10", "jump 10"], answer: "move 10 steps"},
    {question: "What is a block in Scratch?", options: ["A command or instruction", "A bug", "A sound"], answer: "A command or instruction"},
    {question: "Which is a correct way to say something in Scratch?", options: ["say 'Hello!'", "speak 'Hello!'", "print 'Hello!'"], answer: "say 'Hello!'"},
    {question: "What is a broadcast message in Scratch?", options: ["A way to communicate between scripts", "A bug", "A sound"], answer: "A way to communicate between scripts"},
    {question: "Which is a correct way to start a conditional in Scratch?", options: ["if", "when", "repeat"], answer: "if"},
    {question: "What is a backdrop in Scratch?", options: ["The background image", "A bug", "A variable"], answer: "The background image"},
    {question: "Which is a correct way to start a new sprite in Scratch?", options: ["Choose a sprite", "Make a bug", "Add a number"], answer: "Choose a sprite"},
    {question: "What is a project in Scratch?", options: ["A complete program", "A bug", "A color"], answer: "A complete program"},
    {question: "Which is a correct way to stop a script in Scratch?", options: ["stop script", "end", "pause"], answer: "stop script"},
    {question: "What is a sequence in coding?", options: ["Steps in order", "A bug", "A color"], answer: "Steps in order"},
    {question: "Which is a correct way to start a new project in Scratch?", options: ["File > New", "Edit > New", "Project > Start"], answer: "File > New"},
    {question: "What is a sprite's costume in Scratch?", options: ["How it looks", "A bug", "A color"], answer: "How it looks"},
    {question: "Which is a correct way to change a sprite's costume?", options: ["switch costume to", "change color to", "add costume"], answer: "switch costume to"},
    {question: "What is a coordinate in coding?", options: ["A position on the stage", "A bug", "A color"], answer: "A position on the stage"},
    {question: "Which is a correct way to go to a position in Scratch?", options: ["go to x: y:", "move to x: y:", "jump to x: y:"], answer: "go to x: y:"},
    {question: "What is a variable used for in coding?", options: ["To store information", "To draw", "To make sound"], answer: "To store information"},
    {question: "Which is a correct way to change a variable in Scratch?", options: ["set variable to", "change variable to", "make variable"], answer: "set variable to"},
    {question: "What is a forever loop?", options: ["A loop that never stops", "A bug", "A color"], answer: "A loop that never stops"},
    {question: "Which is a correct way to check if two things are equal in Scratch?", options: ["=", ">", "<"], answer: "="},
    {question: "What is a list used for in Scratch?", options: ["To store many items", "To make a sound", "To draw"], answer: "To store many items"},
    {question: "Which is a correct way to add an item to a list in Scratch?", options: ["add item to list", "push item", "insert item"], answer: "add item to list"},
    {question: "What is a clone in Scratch?", options: ["A copy of a sprite", "A bug", "A sound"], answer: "A copy of a sprite"},
    {question: "Which is a correct way to make a clone in Scratch?", options: ["create clone of", "copy sprite", "double sprite"], answer: "create clone of"},
    {question: "What is a stage backdrop in Scratch?", options: ["The background image", "A bug", "A color"], answer: "The background image"},
    {question: "Which is a correct way to delete a sprite in Scratch?", options: ["delete this sprite", "remove sprite", "erase sprite"], answer: "delete this sprite"},
    {question: "What is a broadcast used for in Scratch?", options: ["To send messages between scripts", "To make a sound", "To draw"], answer: "To send messages between scripts"},
    {question: "Which is a correct way to start a script in Scratch?", options: ["when flag clicked", "start script", "run code"], answer: "when flag clicked"},
    {question: "What is a variable in Python?", options: ["A place to store data", "A bug", "A sound"], answer: "A place to store data"},
    {question: "Which is a correct way to add two numbers in Python?", options: ["+", "-", "*"], answer: "+"},
    {question: "What is a string in Python?", options: ["Text", "A bug", "A sound"], answer: "Text"},
    {question: "Which is a correct way to check if two things are equal in Python?", options: ["==", "=", "<"], answer: "=="},
    {question: "What is a function in Python?", options: ["A reusable piece of code", "A bug", "A sound"], answer: "A reusable piece of code"},
    {question: "Which is a correct way to start a function in Python?", options: ["def myFunc()", "func myFunc()", "start myFunc()"], answer: "def myFunc()"},
    {question: "What does 'return' do in a function?", options: ["Gives back a value", "Starts a loop", "Ends a program"], answer: "Gives back a value"},
    {question: "Which is a correct way to start a for loop in Python?", options: ["for i in range(5):", "for i < 5:", "for i = 5"], answer: "for i in range(5):"},
    {question: "What is a module in Python?", options: ["A file with code you can use", "A bug", "A sound"], answer: "A file with code you can use"},
    {question: "Which is a correct way to import a module in Python?", options: ["import math", "add math", "get math"], answer: "import math"},
    {question: "What is a list in Python?", options: ["A collection of items", "A bug", "A sound"], answer: "A collection of items"},
    {question: "Which is a correct way to get the length of a list in Python?", options: ["len(list)", "length(list)", "count(list)"], answer: "len(list)"},
    {question: "What is a dictionary in Python?", options: ["A collection of key-value pairs", "A book", "A sound"], answer: "A collection of key-value pairs"},
    {question: "Which is a correct way to get a value from a dictionary?", options: ["dict[key]", "dict.key", "dict->key"], answer: "dict[key]"},
    {question: "What is a tuple in Python?", options: ["An immutable list", "A bug", "A sound"], answer: "An immutable list"},
    {question: "Which is a correct way to make a tuple in Python?", options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}"], answer: "(1, 2, 3)"},
    {question: "What is a Boolean in Python?", options: ["True or False", "A bug", "A sound"], answer: "True or False"},
    {question: "Which is a correct way to start a while loop in Python?", options: ["while x < 5:", "while x < 5 do", "while x < 5 then"], answer: "while x < 5:"},
    {question: "What is a syntax error in Python?", options: ["A mistake in code rules", "A bug", "A sound"], answer: "A mistake in code rules"},
    {question: "Which is a correct way to start a comment in Python?", options: ["#", "//", "--"], answer: "#"},
    {question: "What is the output of print(2 + 2)?", options: ["4", "22", "2+2"], answer: "4"},
    {question: "Which is a correct way to multiply in Python?", options: ["*", "x", "X"], answer: "*"},
    {question: "What is the output of print('Hello' + 'World')?", options: ["HelloWorld", "Hello World", "Hello+World"], answer: "HelloWorld"},
    {question: "Which is a correct way to subtract in Python?", options: ["-", "_", "/"], answer: "-"},
    {question: "What is a float in Python?", options: ["A number with decimals", "A bug", "A sound"], answer: "A number with decimals"},
    {question: "Which is a correct way to divide in Python?", options: ["/", "//", "%"], answer: "/"},
    {question: "What is a comment used for in code?", options: ["To explain code", "To run code", "To make sound"], answer: "To explain code"},
    {question: "Which is a correct way to check if a number is even in Python?", options: ["x % 2 == 0", "x / 2 == 0", "x == 2"], answer: "x % 2 == 0"},
    {question: "What is the output of print('cat' * 2)?", options: ["catcat", "cat2", "cat cat"], answer: "catcat"},
    {question: "Which is a correct way to check if a list contains an item in Python?", options: ["in", "has", "contains"], answer: "in"},
    {question: "What is the output of print(len('hello'))?", options: ["5", "4", "6"], answer: "5"},
    {question: "Which is a correct way to get the first item of a list in Python?", options: ["list[0]", "list[1]", "list[-1]"], answer: "list[0]"}
>>>>>>> 6709209 (Update Flappy Bird submodule and ensure latest changes are included.)
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
    waitingForNext = 0;
    startScreen.style.display = 'flex';
    gameOverScreen.style.display = 'none';
} // Remove currentQuestionIdx = 0; so first question is always chosen by difficulty

function startGame() {
    console.log('startGame() called');
    gameState = 'playing';
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    nextQuestion(); // This will always pick an easy question at score 0
}

function getDifficultyByScore(score) {
    if (score < 5) return 'easy';
    if (score < 10) return 'medium';
    if (score < 15) return 'hard';
    return 'extreme';
}

<<<<<<< HEAD
=======
function nextQuestion() {
    // Select question based on difficulty progression
    const difficulty = getDifficultyByScore(score);
    let available = QUESTIONS.filter(q => q.difficulty === difficulty);
    if (available.length === 0) available = QUESTIONS; // fallback
    const q = available[Math.floor(Math.random() * available.length)];
    currentQuestionIdx = QUESTIONS.indexOf(q);
    // Shuffle options and pick vertical positions
    const shuffled = q.options.map((opt, i) => ({opt, i})).sort(() => Math.random() - 0.5);
    // Prevent overlapping by picking non-overlapping y positions
    let positions = [];
    let tries = 0;
    while (positions.length < shuffled.length && tries < 100) {
        let candidate = 150 + Math.random() * (canvas.height - 300);
        if (positions.every(pos => Math.abs(pos - candidate) > 120)) {
            positions.push(candidate);
        }
        tries++;
    }
    if (positions.length < shuffled.length) {
        // fallback to spaced positions
        positions = Array.from({length: shuffled.length}, (_, i) => 200 + i * 160);
    }
    bubbles = shuffled.map((item, idx) => ({
        x: canvas.width,
        y: positions[idx],
        r: 50,
        text: item.opt,
        isCorrect: item.opt === q.answer,
        difficulty: q.difficulty
    }));
    waitingForNext = 0;
}
    // Cycle through questions
    const q = QUESTIONS[currentQuestionIdx % QUESTIONS.length];
    // Shuffle options and pick vertical positions
    const shuffled = q.options.map((opt, i) => ({opt, i})).sort(() => Math.random() - 0.5);
    // Use more vertical space for new canvas size
    const positions = [200, 360, 520];
    bubbles = shuffled.map((item, idx) => ({
        x: canvas.width,
        y: positions[idx],
        r: 50,
        text: item.opt,
        isCorrect: item.opt === q.answer
    }));
    waitingForNext = 0;
}

>>>>>>> 6709209 (Update Flappy Bird submodule and ensure latest changes are included.)
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

const DIFFICULTY_COLORS = {
    easy: '#4caf50',      // green
    medium: '#2196f3',   // blue
    hard: '#ff9800',     // orange
    extreme: '#e53935'   // red
};

function drawBubbles() {
    bubbles.forEach(bubble => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
<<<<<<< HEAD
        ctx.fillStyle = bubble.color;
        ctx.shadowColor = '#222';
        ctx.shadowBlur = 10;
=======
        ctx.fillStyle = DIFFICULTY_COLORS[bubble.difficulty || 'easy'] || '#ff6b6b';
        ctx.globalAlpha = 0.7;
>>>>>>> 6709209 (Update Flappy Bird submodule and ensure latest changes are included.)
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
        // Wrap question text into multiple centered lines
        const question = QUESTIONS[currentQuestionIdx % QUESTIONS.length].question;
        ctx.font = 'bold 28px Arial';
        ctx.fillStyle = '#222';
        ctx.textAlign = 'center';
<<<<<<< HEAD
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
=======
        ctx.textBaseline = 'bottom';
        const maxWidth = canvas.width - 80;
        let words = question.split(' ');
        let lines = [];
        let current = '';
        for (let i = 0; i < words.length; i++) {
            let test = current ? current + ' ' + words[i] : words[i];
            if (ctx.measureText(test).width > maxWidth && current) {
                lines.push(current);
                current = words[i];
            } else {
                current = test;
            }
        }
        if (current) lines.push(current);
        // Center lines at the bottom
        let baseY = canvas.height - 30 - (lines.length - 1) * 34;
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], canvas.width / 2, baseY + i * 34);
>>>>>>> 6709209 (Update Flappy Bird submodule and ensure latest changes are included.)
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
