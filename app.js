const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('jeu');
const endGameStatus = document.getElementById('fin2');
const playerOne = 'X'; const playerTwo = 'O';
let playerTurn = playerOne;

/*
Construction de la base du jeu
 */
const Playing = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', playGame, { once: true });
});

function playGame(e) {
    e.target.innerHTML = playerTurn;

    if (win(playerTurn)) {
        updateGameStatus("wins" + playerTurn);
        return endGame();
    } else if (dessinJeu()) {
        updateGameStatus("draw");
        return endGame();
    }

    updateGameStatus(playerTurn);
    playerTurn === playerOne ? playerTurn = playerTwo : playerTurn = playerOne;
}

function win(playerTurn) {
    return Playing.some(combination => {
        return combination.every(index => {
            return cells[index].innerHTML === playerTurn;
        });
    });
}
/*
Faire le dessin de la X ou du O a chaque tour.
 */
function dessinJeu() {
    return [...cells].every(cell => {
        return cell.innerHTML === playerOne || cell.innerHTML === playerTwo;
    });
}

/*
Changement du statut de la game, celui qui a gagné ou perdu.
 */

function updateGameStatus(status) {
    let statusText;

    switch (status) {
        case 'X':
            statusText = "joueur 2 (O)";
            break;
        case 'O':
            statusText = "joueur 1 (X)";
            break;
        case 'winX':
            statusText = "Le joueur 1 (X) a gagné!";
            break;
        case 'winO':
            statusText = "Le joueur 2 (O) a gagné!";
            break;
        case 'equals':
            statusText = "Égalité! Personne ne gagne!";
            break;
    }

    gameStatus.innerHTML = statusText;
    endGameStatus.innerHTML = statusText;
}

/*
fonction de fin de jeu.
 */
function endGame()  {
    document.getElementById('finDuJeu').style.display = "block"
}
/*
fonction pour relancer la game grâce au clique du bouton "recommencer".
 */
function reloadGame()
{ window.location.reload()
}