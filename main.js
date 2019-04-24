let pScore = 0;
let cScore = 0;

// Start function
const startGame = () => {
    const startButton = document.querySelector(".start-btn");
    const infoButton = document.querySelector(".info-btn");
    const introScreen = document.querySelector(".intro");
    const matchScreen = document.querySelector(".match");
    const scoreScreen = document.querySelector(".score");
    const infoPanel = document.querySelector(".info-panel");

    startButton.addEventListener("click", () => {
        introScreen.classList.add("fadeOut");
        matchScreen.classList.add("fadeIn");
        scoreScreen.classList.add("fadeIn");
    });

    infoButton.addEventListener("click", () => {
        infoPanel.style.display = "block";
    })

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
        if (event.target == infoPanel) {
            infoPanel.style.display = "none";
        }
    }
};

// Play Dices
const playDices = () => {
    const rollBtn = document.querySelector(".roll-btn");
    const playerDice = document.querySelector(".player-dice");
    const computerDice = document.querySelector(".computer-dice");

    // Computer options
    const computerOptions = [1, 2, 3, 4, 5, 6];
    const playerOptions = [1, 2, 3, 4, 5, 6];

    rollBtn.addEventListener("click", function () {
        // Computer dice generator
        const computerNumber = Math.floor(Math.random() * 6);
        const computerRoll = computerOptions[computerNumber];

        // Player dice generator
        const playerNumber = Math.floor(Math.random() * 6);
        const playerRoll = playerOptions[playerNumber];

        // Call Compare Dices function
        compareDices(playerRoll, computerRoll);

        // Update Images of Dices
        playerDice.src = `./img/${"dice"+playerRoll}.png`;
        computerDice.src = `./img/${"dice"+computerRoll}.png`;
    });
};

// Update score
const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
}


// Print final result
const finalResult = () => {
    // If player score gets to 10, end the game and run finalScore function
    if (pScore === 10) {
        let r = confirm("Player won! Would you like to play again?");
        if (r == true) {
            pScore = 0;
            cScore = 0;
            updateScore();
            return;
        } else {
            window.location.reload();
        }
        // If computer score gets to 10, end the game and run finalScore function
    } else if (cScore === 10) {
        let r = confirm("Computer won! Would you like to play again?");
        if (r == true) {
            pScore = 0;
            cScore = 0;
            updateScore();
            return;
        } else {
            window.location.reload();
        }
    }
};

// Compare Dices
const compareDices = (playerDice, computerDice) => {
    // Update text announcement
    const winner = document.querySelector(".match-roll");

    // Check for a tie
    if (playerDice === computerDice) {
        winner.textContent = "It is a tie!";
        // End function if it's a tie
        return;
    }

    // Check for player win
    if (playerDice > computerDice) {
        winner.textContent = "Player Wins!";
        // Increment player score if he wins
        pScore++;
        updateScore();
        if (pScore === 10) {
            finalResult();
        }
        return;
    } else {
        winner.textContent = "Computer Wins!";
        // Increment computer score if he wins
        cScore++;
        updateScore();
        if (cScore === 10) {
            finalResult();
        }
        return;
    }
}

startGame();
playDices();
finalResult();