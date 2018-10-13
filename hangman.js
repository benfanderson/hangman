window.onload = function() {
    
    // Chooses word and splits it into array of letters for player to guess
    const words = ["CAT", "DOG", "BOY", "GIRL", "RUN", "JUMP", "ACRE", "BRICK", "CHOSE", "DEPTH", "EXIST", "FILM", "GRAB", "HABIT", "KID", "LUNG", "MELT", "NEIGHBOUR", "OPEN", "POLICE", "RHYME", "SALE", "THUMB", "WEALTH", "ZOO"];
    let rightGuesses = 0;
    let wrongGuesses = 0;
    let guessedLetters =[];
    let targetWord = words[Math.floor(Math.random()*words.length)];
    let letters = targetWord.split("");
    let wordDisplay = Array(letters.length+1).join("_").split("");
    document.getElementById("guessWord").innerHTML = "Here is your word: " + wordDisplay;
    
    // Guess button onclick handler
    guessButton = document.getElementById("guessButton");
    guessButton.onclick = handleGuess;

     // Lets user submit guess using enter/return key
     guessInput = document.getElementById("guessInput");
     guessInput.onkeydown = function(e) {
         // Prevents Uncaught TypeError when enter key is used to call function
         if (typeof(e.preventDefault) == "undefined") {
             if (e.keyCode == 13){
                 handleGuess();
                 return false;
             }
         }
     }
    
     function handleGuess(event) {
        // Stops function attempting to submit data to non-existent server
        event.preventDefault();
        guessInput = document.getElementById("guessInput").value.toUpperCase(); 
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

    // Checks player's guess against letters in targetWord
    function check(value) {
        yourGuesses = document.getElementById("yourGuesses");
        // Lists player's guesses
        yourGuesses.innerHTML = "Your guesses: " + guessedLetters;        
        if (letters.indexOf(value) > -1) {
            // Letter is present in word
            function letterPresent() {
                let i = -1;
                // While loop handles words with double letters
                while ((i= letters.indexOf(value, i+1)) != -1) {
                    wordDisplay[i] = value;
                    rightGuesses = rightGuesses + 1;
                    document.getElementById("guessWord").innerHTML = "Here is your word: " + wordDisplay;
                    if (rightGuesses == letters.length) {
                        // Player has won the game
                        (function () {
                            document.getElementById("form").innerHTML = "You win! You guessed " + targetWord;
                            hangmanPic = document.getElementById("hangmanPic");
                            hangmanPic.src = "images/hangmanwin.jpg";
                        })();
                    } else {
                        // Player guesses right letter
                        (function (){
                            document.getElementById("gameStatus").innerHTML = "Well done! " + value + " is a letter in your word. Keep going.";
                        })();
                    }
                }
            }
            letterPresent();
        } else if (letters.indexOf(value) == -1) {
            // Letter is not present in word 
            function letterAbsent() {
                wrongGuesses = wrongGuesses +1;
                if (wrongGuesses == 6) {
                    (function (){
                        document.getElementById("guessWord").innerHTML = "Here is your word: " + targetWord;
                        document.getElementById("form").innerHTML = "Better luck next time.";
                        hangmanPic = document.getElementById("hangmanPic");
                        hangmanPic.src = "images/hangman6.jpg";
                    })();
                } else {
                    (function (){
                        document.getElementById("gameStatus").innerHTML = "Sorry, " + value + " is not a letter in the word. You have " + (6-wrongGuesses) + " guesses left.";
                        hangmanPic = document.getElementById("hangmanPic");
                        hangmanPic.src = "images/hangman"+wrongGuesses+".jpg";
                    })();
                }
            }
            letterAbsent(); 
        }
    }

    //New game button onclick handler   
    newGame = document.getElementById("newGame");
    newGame.onclick = function() {
        location.reload();
    }
}  
