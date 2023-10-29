/**
 * @jest-environment jsdom
 */

const {
    expect
} = require("@jest/globals");

const {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn,
    showTurns,
    playerTurn
} = require("../game");

jest.spyOn(window, "alert").mockImplementation(() => {});

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("turnInProgress key default value is false", () => {
        expect(game.turnInProgress).toBe(false);
    });
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        // Set sample initial game values to check resetting
        game.score = 42;
        game.currentGame = ["button1", "button2"];
        game.playerMoves = ["button1", "button2"];

        // Set sample initial DOM values
        document.getElementById("score").innerText = "42";

        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("computer sequence array should contain one move", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("expect data-listener to be true for every choice button", () => {
        const buttons = document.getElementsByClassName("circle");
        for (let button of buttons) {
            expect(button.getAttribute("data-listener")).toEqual("true");
        }
    });
});

describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    // Note: can't see why this afterEach is necessary
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a turn to the computer sequence", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("should add turn when playerMoves array is same as currentGame", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should call an alert if the move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    });
    test("should have one turn in currentGame after wrong move", () => {
        game.currentGame = ["button1", "button3", "button4"];
        game.playerMoves.push("wrong");
        playerTurn();
        expect(game.currentGame.length).toBe(1);
    });
    test("turnInProgress should be true while showTurns runs", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("clicking during computer sequence should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});