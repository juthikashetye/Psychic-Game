const totalGuesses = 10;
const alphabet = "abcdefghijklmnopqrstuvwxyz";

var winCounter = 0;
var lossCounter = 0;
var guessLeftCounter = totalGuesses;
var historyString = "";
var computerAlphabet = alphabet[Math.floor(Math.random() * alphabet.length)];

var winSpan = document.querySelector('#winSpan');
var lossSpan = document.querySelector('#lossSpan');
var guessLeftSpan = document.querySelector('#guessLeftSpan');
var historySpan = document.querySelector('#historySpan');

function setInnerTextOfSpan(span, text) {
    span.innerText = text;
}

setInnerTextOfSpan(winSpan, winCounter);
setInnerTextOfSpan(lossSpan, lossCounter);
setInnerTextOfSpan(guessLeftSpan, guessLeftCounter);
setInnerTextOfSpan(historySpan, historyString);

function checkGuess() {
    //get user input
    var userInput = event.key;
    //if user input matches computer guess WIN!
    if (userInput == computerAlphabet) {
        processCorrectGuess();
    } //if no match then the guess is wrong,
    // process only new guesses
    else if (!historyString.includes(userInput)) {
        processNewIncorrectGuess(userInput);
    } else {
        processRepeatedGuess(userInput);
    }
}

function processRepeatedGuess(guess) {
    return null;
}

function processCorrectGuess() {
    winCounter++;
    setInnerTextOfSpan(winSpan, winCounter);
    startNewRound();
}

function processNewIncorrectGuess(guess) {
    //add user input to history
    addToHistory(guess);
    //reduce guesses
    guessLeftCounter--;
    setInnerTextOfSpan(guessLeftSpan, guessLeftCounter)

    //if guesses reach 0 then user loses
    if (guessLeftCounter < 1) {
        alert("You Lose , I had guessed : \"" + computerAlphabet + "\"");
        lossCounter++;
        setInnerTextOfSpan(lossSpan, lossCounter);
        startNewRound();
    }
}

function addToHistory(guess) {
    if (historyString == "") {
        historyString = guess;
    } else {
        historyString = historyString + ", " + guess;
    }
    setInnerTextOfSpan(historySpan, historyString);
}

function startNewRound() {
    //Reset the guess counter
    guessLeftCounter = totalGuesses;
    //empty the guesses so far
    historyString = "";
    //display the new values on screen
    setInnerTextOfSpan(guessLeftSpan, guessLeftCounter);
    setInnerTextOfSpan(historySpan, historyString);

    //pick a new guess
    computerAlphabet = alphabet[Math.floor(Math.random() * alphabet.length)];
}

document.onkeypress = checkGuess;