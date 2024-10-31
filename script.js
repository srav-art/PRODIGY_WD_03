let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameOver = false;

function startGame() {
    board.fill("");
    currentPlayer = "X";
    isGameOver = false;
    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("blast"); // Remove blast effect
    });
    document.getElementById("message").innerText = "Player X's turn";
    document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleClick));
}

function handleClick(event) {
    const index = event.target.getAttribute("data-index");
    if (board[index] || isGameOver) return;

    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;

    const winningPattern = checkWin();
    if (winningPattern) {
        document.getElementById("message").innerText = `Player ${currentPlayer} wins!`;
        isGameOver = true;
        highlightWinningCells(winningPattern);
        endGame();
    } else if (!board.includes("")) {
        document.getElementById("message").innerText = "It's a draw!";
        isGameOver = true;
        endGame();
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.getElementById("message").innerText = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return pattern; // Return the winning pattern
        }
    }
    return null;
}

function highlightWinningCells(pattern) {
    pattern.forEach(index => {
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.classList.add("blast"); // Apply blast effect
    });
}

function endGame() {
    document.querySelectorAll(".cell").forEach(cell => cell.removeEventListener("click", handleClick));
}

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleClick));