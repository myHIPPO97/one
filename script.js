const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const ROWS = 17, COLS = 10, CELL_SIZE = 30;
let grid = [], score = 0, timeLeft = 120;
let isDragging = false;
let selectedCells = [];

function initGame() {
    for (let r = 0; r < ROWS; r++) {
        grid[r] = [];
        for (let c = 0; c < COLS; c++) {
            grid[r][c] = Math.floor(Math.random() * 9) + 1;
        }
    }
    drawGrid();
    setInterval(updateTimer, 1000);
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            ctx.fillStyle = "red";
            ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE - 2, CELL_SIZE - 2);
            ctx.fillStyle = "white";
            ctx.font = "16px Arial";
            ctx.fillText(grid[r][c], c * CELL_SIZE + 10, r * CELL_SIZE + 20);
        }
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("timer").innerText = `남은 시간: ${timeLeft}초`;
    } else {
        alert("게임 종료! 점수: " + score);
    }
}

canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    selectedCells = [];
    selectCell(e);
});

canvas.addEventListener("mousemove", (e) => {
    if (isDragging) selectCell(e);
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
    checkAndRemoveApples();
});

function selectCell(e) {
    let x = Math.floor(e.offsetX / CELL_SIZE);
    let y = Math.floor(e.offsetY / CELL_SIZE);
    
    if (!selectedCells.some(cell => cell.x === x && cell.y === y)) {
        selectedCells.push({ x, y, value: grid[y][x] });
    }
}

function checkAndRemoveApples() {
    let sum = selectedCells.reduce((acc, cell) => acc + cell.value, 0);

    if (sum === 10) {
        selectedCells.forEach(cell => {
            grid[cell.y][cell.x] = Math.floor(Math.random() * 9) + 1;
        });
        score += selectedCells.length;
        document.getElementById("score").innerText = `점수: ${score}`;
    }

    selectedCells = [];
    drawGrid();
}

initGame();
