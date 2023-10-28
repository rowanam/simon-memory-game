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
}

/**
 * Display score in DOM
 */
function showScore() {
    document.getElementById("score").innerText = game.score;
}

module.exports = {
    game,
    newGame,
    showScore
}