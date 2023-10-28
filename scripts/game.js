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

module.exports = {
    game,
    newGame,
    showScore,
    addTurn
}