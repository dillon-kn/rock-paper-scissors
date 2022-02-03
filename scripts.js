const winnerKey = {
    "rock": "scissors",
    "scissors": "paper",
    "paper": "rock"
}

function computerPlay() {
    let options = ["Rock", "Paper", "Scissors"];
    return options[Math.floor(Math.random() * 3)];
}

function getUserMove() {
    let move = prompt("Choose and type 'rock', 'paper', or 'scissors'!")
    return move
}

function playRound() {
    let computerMove = computerPlay().toLowerCase();
    let userMove = getUserMove().toLowerCase();
    while (userMove === null || !winnerKey.hasOwnProperty(userMove)) {
        userMove = getUserMove().toLowerCase();
    }

    if (computerMove === userMove) {
        console.log(`It's a tie! Both of you played ${title(computerMove)}`);
        return "TIE";
    }
    else if (winnerKey[computerMove] === userMove) {
        console.log(`You lose! ${title(computerMove)} beats ${title(userMove)}!`);
        return "COMPUTER_WIN";
    }
    console.log(`You win! ${title(userMove)} beats ${title(computerMove)}!`);
    return "USER_WIN";
}

function game() {
    let userPoints = 0;
    let computerPoints = 0;
    while (userPoints < 3 && computerPoints < 3) {
        result = playRound();
        if (result === "USER_WIN") {
            userPoints++;
        }
        else if (result === "COMPUTER_WIN") {
            computerPoints++;
        }
    }
    printWinner(userPoints, computerPoints);
}

function printWinner(userPoints, computerPoints) {
    if (userPoints > computerPoints) {
        console.log(`You win! The score was ${userPoints}-${computerPoints}`);
    }
    else {
        console.log(`You win! The score was ${userPoints}-${computerPoints}`);
    }
}

function title(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}