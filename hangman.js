const words = ["CAT", "DOG", "BOY", "GIRL", "RUN", "JUMP", "ACRE", "BRICK", "CHOSE", "DEPTH", "EXIST", "FILM", "GRAB", "HABIT", "KID", "LUNG", "MELT", "NEIGHBOUR", "OPEN", "POLICE", "RHYME", "SALE", "THUMB", "WEALTH", "ZOO"];
let rightGuesses = 0;
let wrongGuesses = 0;
let guessedLetters =[];

// Chooses word and splits it into array of letters for player to guess
function getLetters() {
    targetWord = words[Math.floor(Math.random()*words.length)];
    letters = targetWord.split("");
    wordDisplay =Array(letters.length+1).join("_");
    wordDisplay = wordDisplay.split("");
    $("#guessWord").text(`Here is your word: ${wordDisplay}`);
    return wordDisplay;
}

// Checks player's guess against letters in targetWord
function check(value) {
    // Lists player's guesses
    $("#yourGuesses").text(`Your guesses: ${guessedLetters}`)
    if (letters.indexOf(value) > -1) {
        // Letter is present in word
        letterPresent(value);
    } else if (letters.indexOf(value) == -1) {
        // Letter is not present in word 
        letterAbsent(value); 
    }
}

function letterPresent(value) {
    let i = -1;
    // While loop handles words with double letters
    while ((i= letters.indexOf(value, i+1)) != -1) {
        wordDisplay[i] = value;
        rightGuesses = rightGuesses + 1;
        $("#guessWord").text(`Here is your word: ${wordDisplay}`)
        if (rightGuesses == letters.length) {
            // Player has won the game
            showWin();
        } else {
            // Player guesses right letter
            rightLetter(value);
        }
    }
}

function letterAbsent(value) {
    wrongGuesses = wrongGuesses +1;
        if (wrongGuesses == 6) {
            // Player has lost the game
            showLoss();
        } else {
            // Player guesses wrong letter
            wrongLetter(value);
        }
    
}

function showWin() {
    $("#form").text(`You win! You guessed ${targetWord}`);
    $("#hangmanPic").attr("src", "images/hangmanwin.jpg");
}

function showLoss() {
    $("#guessWord").text(`Here is your word: ${targetWord}`);
    $("#form").text("Better luck next time.");
    $("#hangmanPic").attr("src", "images/hangman6.jpg");
}

function wrongLetter(value) {
    $("#gameStatus"). text(`Sorry, ${value} is not a letter in the word. You have ${6-wrongGuesses} guesses left`);
    $("#hangmanPic").attr("src", `images/hangman${wrongGuesses}.jpg`);
}

function rightLetter(value) { 
    $("#gameStatus").text(`Well done! ${value} is a letter in your word. Keep going.`)
}

function handleGuess(event) {
    // Stops function attempting to submit data to non-existent server
    event.preventDefault();
    const guessInput = document.getElementById("guessInput").value.toUpperCase(); 
    regExp = /[^A-Z]/;
    if (wordDisplay.indexOf(guessInput) > -1 || guessedLetters.indexOf(guessInput) > - 1) {
        document.querySelector("#gameStatus").innerHTML ="You've already guessed that letter! Try another one.";
        document.querySelector("#form").reset();
    } else if (regExp.test(guessInput) || guessInput == "") {
        document.querySelector("#gameStatus").innerHTML ="You can only guess the letters A to Z";
        document.querySelector("#form").reset();
    } else { 
    guessedLetters.push(guessInput);    
    check(guessInput);
    document.querySelector("#form").reset();
    }
    
}

// Lets user submit guess using enter/return key
function keyGuess(e) {
    // Prevents Uncaught TypeError when enter key is used to call function
    if (typeof(e.preventDefault) == "undefined") {
        if (e.keyCode == 13){
            handleGuess();
            return false;
         }
    }
}

$(document).ready(function(){
    getLetters();

    // Guess button onclick handler
    $("#guessButton").click(function(event){
        handleGuess(event);
    });

    // Enter onkeydown handler
    $("#guessInput").keydown(function(e){
        keyGuess(e);
    });

    //New game button onclick handler  
    $("#newGame").click(function(){
        location.reload();
    });
});
