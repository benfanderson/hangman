const words = ["CAT", "DOG", "BOY", "GIRL", "RUN", "JUMP" ];
const targetWord = words[Math.floor(Math.random()*words.length)];
const letters = targetWord.split("");
let rightGuesses = 0;
let wrongGuesses = 0;
let guessedLetters =[];

function check(value) {
        newLetter = value;
        yourGuesses = document.getElementById("yourGuesses");
        yourGuesses.innerHTML = "Your guesses: " + guessedLetters;
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
    hangmanPic = document.getElementById("hangmanPic");
    hangmanPic.src = "images/hangman"+(wrongGuesses+1)+".jpg";
}

function wrongLetter() {
    wrongGuesses = wrongGuesses + 1;
    document.getElementById("form").reset();
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
    }else { 
          
    guessedLetters.push(guessInput);    
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

  
  const newGame = document.getElementById("newGame");
  newGame.onclick = newHangman;
}