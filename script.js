const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    highlightWinner();
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

function highlightWinner() {
  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      document
        .querySelector(`.cell[data-index="${a}"]`)
        .classList.add("winner");
      document
        .querySelector(`.cell[data-index="${b}"]`)
        .classList.add("winner");
      document
        .querySelector(`.cell[data-index="${c}"]`)
        .classList.add("winner");
    }
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
