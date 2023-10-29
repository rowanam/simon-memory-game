let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
}

/**
 * Start a new game
 */
function newGame() {
    // Reset game starting state
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];

    // Add event listeners for player clicks to option buttons
    for (let button of document.getElementsByClassName("circle")) {
        if (button.getAttribute("data-listener") !== "true") {
            button.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.target.getAttribute("id");
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
            });
            button.setAttribute("data-listener", "true");
        }
    }

    // Reset DOM starting score display
    showScore();

    // Add first turn to sequence
    addTurn();
}

/**
 * Display score in DOM
 */
function showScore() {
    document.getElementById("score").innerText = game.score;
}

/**
 * Add a turn to current game sequence and call turn showing function
 */
function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

/**
 * Light up an option button for 400ms
 * @param {*} circ - id of option button
 */
function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

/**
 * Light up each button in the computer game sequence
 */
function showTurns() {
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);
}

/**
 * Check if player turn is correct
 */
function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length == game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}

module.exports = {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn,
    showTurns,
    playerTurn
}