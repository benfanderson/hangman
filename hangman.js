const words = ["cat", "dog", "boy", "girl", "run", "jump"];
const targetWord = words[Math.floor(Math.random()*words.length)];
const letters = targetWord.split("");
let rightGuesses = 0;
let wrongGuesses = 0;

function check(value) {
        newLetter = value;
        if (letters.includes(value) && rightGuesses == (letters.length-1)) {
            wordDisplay[letters.indexOf(value)] = value;
            document.getElementById("guessWord").innerHTML = "Here is your word: " + wordDisplay;
            showWin();
        }

        else if ( letters.includes(value)) {
            wordDisplay[letters.indexOf(value)] = value;
            document.getElementById("guessWord").innerHTML = "Here is your word: " + wordDisplay;
            rightLetter();
        }

        else if (letters.includes(value) == false && wrongGuesses > 4) { 
            showLoss();
        }

        else if (letters.includes(value) == false) {
            wrongLetter();
        }
}

function getLetters() {
    wordDisplay =Array(letters.length+1).join("_");
    wordDisplay = wordDisplay.split("");
    document.getElementById("guessWord").innerHTML = "Here is your word: " + wordDisplay;
    return wordDisplay;
}

function showWin() {
    document.getElementById("gameStatus").innerHTML = "You win! You guessed " + targetWord;
}

function showLoss() {
    document.getElementById("form").reset();
    document.getElementById("gameStatus").innerHTML = "Better luck next time.";
}

function wrongLetter() {
    wrongGuesses = wrongGuesses + 1;
    document.getElementById("form").reset();
    document.getElementById("gameStatus").innerHTML = "Sorry, " + newLetter + " is not a letter in the word. You have " + (6-wrongGuesses) + " guesses left.";
}

function rightLetter() { 
    rightGuesses = rightGuesses + 1;
    document.getElementById("gameStatus").innerHTML = "Well done! " + newLetter + " is a letter in your word. Keep going.";
}

function handleGuess() {
    const guessInput = document.getElementById("guessInput").value;
    if (wordDisplay.indexOf(guessInput) > -1) {
        document.getElementById("gameStatus").innerHTML ="You've already guessed that letter! Try another one.";
        document.getElementById("form").reset();
    } else { 
    check(guessInput);
    document.getElementById("form").reset();
    }
}

function keyGuess(e) {
    if (e.keyCode == 13){
      handleGuess();
      return false;
   }
}

window.onload = init;

function init() {
    getLetters();

    // Guess button onclick handler
  const guessButton = document.getElementById("guessButton");
  guessButton.onclick = handleGuess;

  // Enter onkeydown handler
  const guessInput = document.getElementById("guessInput");
  guessInput.onkeydown = keyGuess;

  

}