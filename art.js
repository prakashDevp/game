const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let gameActive = true;
let currentPlayer = 'X';
let gameState = Array(9).fill('');

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]            // diagonals
];

function handleSquareClick(clickedSquare, clickedSquareIndex) {
    if (gameState[clickedSquareIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedSquareIndex] = currentPlayer;
    clickedSquare.innerHTML = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusDisplay.innerHTML = 'Game ended in a draw!';
        gameActive = false;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = Array(9).fill('');
    statusDisplay.innerHTML = '';
    document.querySelectorAll('.square').forEach(square => square.innerHTML = '');
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('click', () => handleSquareClick(square, i));
        board.appendChild(square);
    }
}

restartBtn.addEventListener('click', restartGame);
createBoard();
