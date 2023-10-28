let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
}

/**
 * Start a new game
 */
function newGame() {
    // Reset game starting state
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    showScore();
    addTurn();
}

/**
 * Display score in DOM
 */
function showScore() {
    document.getElementById("score").innerText = game.score;
}

/**
 * Add a turn to current game sequence and clear player moves from pervious turn
 */
function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    // showTurns();
}

/**
 * Add "light" class to an option button, then remove it after 400ms
 * @param {*} circ - id of option button
 */
function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

module.exports = {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn
}