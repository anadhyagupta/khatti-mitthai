let board = [];
let currentPlayer = 1;
let gameOver = false;
let totalRows = 4;
let totalCols = 5;

const boardDiv = document.getElementById('board');
const turnDiv = document.getElementById('player-turn');
const resultDiv = document.getElementById('result');
const resetBtn = document.getElementById('reset-btn');
const startBtn = document.getElementById('start-btn');
const rowInput = document.getElementById('rows');
const colInput = document.getElementById('cols');

function createBoard(rows, cols) {
    totalRows = rows;
    totalCols = cols;
    boardDiv.innerHTML = '';
    boardDiv.style.gridTemplateColumns = `repeat(${cols}, 60px)`;
    boardDiv.style.gridTemplateRows = `repeat(${rows}, 60px)`;
    board = [];

    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (r === rows - 1 && c === 0) {
                cell.classList.add('spoiled'); // khatti mithai
            } else {
                cell.classList.add('normal-mithai'); // normal mithai
            }

            cell.dataset.row = r;
            cell.dataset.col = c;

            cell.addEventListener('click', handleClick);
            boardDiv.appendChild(cell);
            row.push(cell);
        }
        board.push(row);
    }

    currentPlayer = 1;
    gameOver = false;

    turnDiv.textContent = `Player ${currentPlayer}'s Turn`;
    resultDiv.classList.remove('show');
    resultDiv.style.display = 'none';
    resetBtn.classList.add('hidden');
}

function handleClick(e) {
    if (gameOver) return;

    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    if (!board[row][col] || board[row][col].classList.contains('removed')) return;

    for (let r = 0; r <= row; r++) {
        for (let c = col; c < totalCols; c++) {
            if (board[r][c] && !board[r][c].classList.contains('removed')) {
                board[r][c].classList.add('removed');
                board[r][c].style.backgroundImage = 'none';
            }
        }
    }

    if (row === totalRows - 1 && col === 0) {
        resultDiv.textContent = `Player ${currentPlayer} took the Khatti Mithai and loses!`;
        resultDiv.classList.add('show');
        resetBtn.classList.remove('hidden'); // ✅ Show it now
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    turnDiv.textContent = `Player ${currentPlayer}'s Turn`;
}


startBtn.addEventListener('click', () => {
    const rows = parseInt(rowInput.value);
    const cols = parseInt(colInput.value);
    if (rows >= 2 && cols >= 2) {
        document.getElementById('setup-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        createBoard(rows, cols);
    }
});

resetBtn.addEventListener('click', () => {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('setup-screen').classList.remove('hidden');
    resetBtn.classList.add('hidden'); // ✅ Hide again for next game
});