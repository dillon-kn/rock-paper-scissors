// TODO
// Update score after each win
// Stop at 5 wins
// Show winner

const winnerKey = {
    "rock": "scissors",
    "scissors": "paper",
    "paper": "rock"
}

const currentScore = {
    "kanojia": 0,
    "potential-convert": 0
}

const game = () => {
    let userPoints = 0;
    let computerPoints = 0;

    const choices = document.querySelectorAll('.choice');
    choices.forEach((choice) => {
            choice.addEventListener('click', playRound)
        }
    )
}

const generateComputerMove = () => {
    const options = ["rock", "paper", "scissors"];

    // Chooce random number between 0 and 2 and pick the corresponding index
    return options[Math.floor(Math.random() * 3)];
}

const playRound = (choice) => {
    
    // Get moves
    let computerMove = generateComputerMove();
    let userMove = choice.target.id;
    if (userMove === null || !winnerKey.hasOwnProperty(userMove)) {
        return
    }

    // Add result div if not yet existent
    if (!document.querySelector(".result")) {
        const choiceContainer = document.querySelector('.choice-container');

        let result = document.createElement('div');
        result.classList.add('result');
        choiceContainer.insertBefore(result, document.querySelector('.score-outer-container'));
    }

    let winner = '';
    let result = document.querySelector('.result');

    // Display correct result
    if (computerMove === userMove) {
        result.textContent = `
            A tie! You both picked ${title(computerMove)}! Try Again!
        `
    }

    else if (winnerKey[computerMove] === userMove) {
        winner = "kanojia"
        result.textContent = `
            He read your mind! He knew you would play ${title(userMove)} and beat you with ${title(computerMove)}!
        `
    }

    else {
        winner = "potential-convert";
        result.textContent = `You did it! You psychoanalyzed him and predicted he would play ${title(computerMove)}! You're good at this!`
    }

    incrementScore(winner);
    showScore()

    // Check if game end
    checkGameEnd();
}

const incrementScore = (winner) => {
    if (currentScore.hasOwnProperty(winner)) {
        ++currentScore[winner]
    }
}

const showScore = () => {
    const scores = document.querySelectorAll('.score')
    scores.forEach((score) => {
            let scoreValue = score.querySelector('h3')
            scoreValue.textContent = +currentScore[scoreValue.id];
        }
    )
}

const checkGameEnd = () => {
    // If someone reaches 5 points
    potentialConvertScore = currentScore['potential-convert'];
    kanojiaScore = currentScore['kanojia'];
    if (potentialConvertScore === 5 || kanojiaScore === 5) {

        const finalResult = document.createElement('h2');
        finalResult.setAttribute('id', 'final-result')
        const choiceContainer = document.querySelector('.choice-container')

        if (potentialConvertScore === 5) {
            finalResult.textContent = "Congrats! You fought off Kult Leader Kanojia's Kunning Kharisma and avoided Konversion!!!";
        }
        else {
            finalResult.textContent = "Dah! You were inKapable of Kombating Kult Leader Kanojia's Kunning Kharisma and Konsented to Konversion!!!";
        }
        choiceContainer.appendChild(finalResult)

        // Turn off all buttons and create a button to reset the page
        turnOffButtons();
        addResetButton();

    }
}

const turnOffButtons = () => {
    const choices = document.querySelectorAll('.choice');
    choices.forEach((choice) => {
            choice.removeEventListener('click', playRound)
        }
    )
}

const addResetButton = () => {
    const resetButton = document.createElement('button');
    resetButton.classList.add('reset-btn');
    resetButton.textContent = "Reset";
    resetButton.addEventListener('click', resetPage);
    const choiceContainer = document.querySelector('.choice-container');
    choiceContainer.appendChild(resetButton);
}

const resetPage = () => {
    // Reset scores
    currentScore['potential-convert'] = 0;
    currentScore['kanojia'] = 0;
    showScore();

    // Remove result div, final result div, and reset button
    const result = document.querySelector('.result');
    const finalResult = document.querySelector('#final-result');
    const resetButton = document.querySelector('.reset-btn');
    const choiceContainer = document.querySelector('.choice-container');
    choiceContainer.removeChild(result);
    choiceContainer.removeChild(finalResult);
    choiceContainer.removeChild(resetButton);

    // Turn buttons back on
    const choices = document.querySelectorAll('.choice');
    choices.forEach((choice) => {
            choice.addEventListener('click', playRound)
        }
    )
}

const title =  (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

game()