const words = ["CAT", "DOG", "BOY", "GIRL", "RUN", "JUMP", "ACRE", "BRICK", "CHOSE", "DEPTH", "EXIST", "FILM", "GRAB", "HABIT", "KID", "LUNG", "MELT", "NEIGHBOUR", "OPEN", "POLICE", "RHYME", "SALE", "THUMB", "WEALTH", "ZOO"];
const targetWord = words[Math.floor(Math.random()*words.length)];
const letters = targetWord.split("");
let rightGuesses = 0;
let wrongGuesses = 0;
let guessedLetters =[];

// Checks player's guess against letters in targetWord
function check(value) {
        newLetter = value;
        yourGuesses = document.getElementById("yourGuesses");
        
        // Lists player's guesses
        yourGuesses.innerHTML = "Your guesses: " + guessedLetters;

        // Player has won the game
        if (letters.includes(value) && rightGuesses == (letters.length-1)) {
            wordDisplay[letters.indexOf(value)] = value;
            document.getElementById("guessWord").innerHTML = "Here is your word: " + wordDisplay;
            showWin();
        } 
        
        // Player guesses right letter
        else if ( letters.includes(value)) {
            wordDisplay[letters.indexOf(value)] = value;
            document.getElementById("guessWord").innerHTML = "Here is your word: " + wordDisplay;
            rightLetter();
        } 
        
        // Player has lost the game
        else if (letters.includes(value) == false && wrongGuesses > 4) { 
            showLoss();

        // Player guesses wrong letter    
        } else if (letters.includes(value) == false) {
            wrongLetter();
        }
}


// Splits targetWord into array of letters for player to guess
function getLetters() {
    wordDisplay =Array(letters.length+1).join("_");
    wordDisplay = wordDisplay.split("");
    document.getElementById("guessWord").innerHTML = "Here is your word: " + wordDisplay;
    return wordDisplay;
}

function showWin() {
    document.getElementById("form").innerHTML = "You win! You guessed " + targetWord;
    hangmanPic = document.getElementById("hangmanPic");
    hangmanPic.src = "images/hangmanwin.jpg";
}

function showLoss() {
    document.getElementById("form").innerHTML = "Better luck next time.";
    hangmanPic = document.getElementById("hangmanPic");
    hangmanPic.src = "images/hangman"+(wrongGuesses+1)+".jpg";
}

function wrongLetter() {
    wrongGuesses = wrongGuesses + 1;
    document.getElementById("gameStatus").innerHTML = "Sorry, " + newLetter + " is not a letter in the word. You have " + (6-wrongGuesses) + " guesses left.";
    hangmanPic = document.getElementById("hangmanPic");
    hangmanPic.src = "images/hangman"+wrongGuesses+".jpg";
}

function rightLetter() { 
    rightGuesses = rightGuesses + 1;
    document.getElementById("gameStatus").innerHTML = "Well done! " + newLetter + " is a letter in your word. Keep going.";
}

function handleGuess() {
    const guessInput = document.getElementById("guessInput").value.toUpperCase(); 
    regExp = /[^A-Z]/;
    if (wordDisplay.indexOf(guessInput) > -1 || guessedLetters.indexOf(guessInput) > - 1) {
        document.getElementById("gameStatus").innerHTML ="You've already guessed that letter! Try another one.";
        document.getElementById("form").reset();
    } else if (regExp.test(guessInput) || guessInput == "") {
        document.getElementById("gameStatus").innerHTML ="You can only guess the letters A to Z";
        document.getElementById("form").reset();
    } else { 
    guessedLetters.push(guessInput);    
    check(guessInput);
    document.getElementById("form").reset();
    }
}

// Lets user submit guess using enter/return key
function keyGuess(e) {
    if (e.keyCode == 13){
      handleGuess();
      return false;
   }
}

function newHangman() {
    location.reload();
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

    //New game button onclick handler   
    const newGame = document.getElementById("newGame");
    newGame.onclick = newHangman;
}