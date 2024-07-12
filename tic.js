// Initialize the game board and current player
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Define the winning conditions
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // First column
    [1, 4, 7], // Second column
    [2, 5, 8], // Third column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

// Get references to the game board, cells, message display, and reset button
const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

// Add click event listeners to each cell and the reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);

// Function to handle cell clicks
function handleCellClick(event) {
    const clickedCell = event.target; // Get the clicked cell element
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index')); // Get the cell index

    // If the cell is already filled or the game is over, do nothing
    if (board[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // Update the board and the cell's text
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    // Check if someone has won or if it's a draw
    checkResult();
}

// Function to check the result of the game
function checkResult() {
    let roundWon = false; // Assume no one has won yet
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // If someone has won, display the winner and end the game
    if (roundWon) {
        message.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    // If it's a draw (no empty cells left), display a draw message
    let roundDraw = board.every(cell => cell !== "");
    if (roundDraw) {
        message.innerText = "It's a draw!";
        gameActive = true;
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to handle resetting the game
function handleResetGame() {
    board = ["", "", "", "", "", "", "", "", ""]; // Clear the board
    gameActive = true; // Make the game active again
    currentPlayer = "X"; // Reset the current player
    message.innerText = ""; // Clear the message
    cells.forEach(cell => cell.innerText = ""); // Clear all cell texts
}

// Display initial empty board
renderBoard();

function renderBoard() {
    for (let i = 0; i < board.length; i++) {
        cells[i].innerText = board[i];
    }
}
