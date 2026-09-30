// Game State Variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let currentGameMode = 'two-player'; // 'two-player' or 'vs-robo'
let isRoboThinking = false;
let roboTimeoutId = null;

// Scoreboard State
const scores = {
  x: 0,
  o: 0,
  draws: 0
};

// DOM Elements
const statusMessage = document.getElementById('status-message');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
const resetScoreBtn = document.getElementById('reset-score-btn');
const twoPlayerBtn = document.getElementById('two-player-btn');
const vsRoboBtn = document.getElementById('vs-robo-btn');

const xScoreEl = document.getElementById('x-score');
const oScoreEl = document.getElementById('o-score');
const drawScoreEl = document.getElementById('draw-score');
const xLabelEl = document.getElementById('x-label');
const oLabelEl = document.getElementById('o-label');

// All 8 Winning Combinations (Rows, Columns, Diagonals)
const winningCombinations = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6]  // Diagonal 2
];

// Initialize Game
function initGame() {
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
  restartBtn.addEventListener('click', restartGame);
  resetScoreBtn.addEventListener('click', resetScores);
  twoPlayerBtn.addEventListener('click', () => switchMode('two-player'));
  vsRoboBtn.addEventListener('click', () => switchMode('vs-robo'));

  updateScoreboardLabels();
  updateStatus();
}

// Handle Cell Click (Human Move)
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'), 10);

  // Ignore click if cell is occupied, game is over, or Robo is taking its turn
  if (board[clickedCellIndex] !== '' || !isGameActive || isRoboThinking) {
    return;
  }

  // Make move for current player
  makeMove(clickedCell, clickedCellIndex);

  // Check outcome after move
  const outcome = checkGameResult();

  // If in "vs-robo" mode and game is still active, trigger Robo move
  if (currentGameMode === 'vs-robo' && outcome === 'continue') {
    triggerRoboMove();
  }
}

// Place Mark on the Board and Update Cell UI
function makeMove(cellElement, index) {
  board[index] = currentPlayer;
  cellElement.textContent = currentPlayer;
  cellElement.classList.add(currentPlayer.toLowerCase());
}

// Smart Rule-Based Decision for Robo
function getSmartRoboMove() {
  // 1. Can Robo (O) win on this move?
  const winningMove = findWinningOrBlockingMove('O');
  if (winningMove !== null) return winningMove;

  // 2. Can Human (X) win on next move? Block them!
  const blockingMove = findWinningOrBlockingMove('X');
  if (blockingMove !== null) return blockingMove;

  // 3. Take center cell if empty
  if (board[4] === '') return 4;

  // 4. Prefer an available corner (0, 2, 6, 8)
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(index => board[index] === '');
  if (availableCorners.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableCorners.length);
    return availableCorners[randomIndex];
  }

  // 5. Otherwise choose any random available cell
  const emptyIndices = [];
  board.forEach((cell, index) => {
    if (cell === '') emptyIndices.push(index);
  });

  if (emptyIndices.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyIndices.length);
    return emptyIndices[randomIndex];
  }

  return null;
}

// Helper to Find a Winning or Blocking Move for a Symbol
function findWinningOrBlockingMove(symbol) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const line = [board[a], board[b], board[c]];
    const indices = [a, b, c];

    const symbolCount = line.filter(val => val === symbol).length;
    const emptyCount = line.filter(val => val === '').length;

    if (symbolCount === 2 && emptyCount === 1) {
      const emptyPos = line.indexOf('');
      return indices[emptyPos];
    }
  }
  return null;
}

// Robo Automated Move Logic
function triggerRoboMove() {
  isRoboThinking = true;
  statusMessage.textContent = 'Robo is thinking...';

  // Small delay so Robo feels natural
  roboTimeoutId = setTimeout(() => {
    if (!isGameActive) {
      isRoboThinking = false;
      return;
    }

    const chosenIndex = getSmartRoboMove();

    if (chosenIndex !== null) {
      const targetCell = cells[chosenIndex];
      makeMove(targetCell, chosenIndex);
      checkGameResult();
    }

    isRoboThinking = false;
    roboTimeoutId = null;
  }, 500);
}

// Check for Win, Draw, or Next Turn
function checkGameResult() {
  let roundWon = false;
  let winningLine = [];

  // Check all winning combinations
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      winningLine = [a, b, c];
      break;
    }
  }

  // Handle Win
  if (roundWon) {
    isGameActive = false;
    highlightWinningCells(winningLine);

    if (currentPlayer === 'X') {
      scores.x++;
      xScoreEl.textContent = scores.x;
      statusMessage.textContent = currentGameMode === 'vs-robo' ? 'You Win! 🎉' : 'Player 1 Wins! 🎉';
    } else {
      scores.o++;
      oScoreEl.textContent = scores.o;
      statusMessage.textContent = currentGameMode === 'vs-robo' ? 'Robo Wins! 🤖' : 'Player 2 Wins! 🎉';
    }
    return 'win';
  }

  // Handle Draw
  const isDraw = !board.includes('');
  if (isDraw) {
    isGameActive = false;
    scores.draws++;
    drawScoreEl.textContent = scores.draws;
    statusMessage.textContent = "It's a Draw! 🤝";
    return 'draw';
  }

  // Switch Player Turn
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
  return 'continue';
}

// Highlight the 3 Winning Cells
function highlightWinningCells(indices) {
  indices.forEach(index => {
    cells[index].classList.add('winner');
  });
}

// Update Turn Status Message
function updateStatus() {
  if (currentGameMode === 'vs-robo') {
    statusMessage.textContent = currentPlayer === 'X' ? 'Your Turn — X' : "Robo's Turn — O";
  } else {
    statusMessage.textContent = currentPlayer === 'X' ? "Player 1's Turn — X" : "Player 2's Turn — O";
  }
}

// Update Scoreboard Header Labels based on Mode
function updateScoreboardLabels() {
  if (currentGameMode === 'vs-robo') {
    xLabelEl.textContent = 'Human (X)';
    oLabelEl.textContent = 'Robo (O)';
  } else {
    xLabelEl.textContent = 'Player 1 (X)';
    oLabelEl.textContent = 'Player 2 (O)';
  }
}

// Switch Game Mode
function switchMode(mode) {
  if (currentGameMode === mode) return;

  currentGameMode = mode;
  if (mode === 'two-player') {
    twoPlayerBtn.classList.add('active');
    vsRoboBtn.classList.remove('active');
  } else {
    vsRoboBtn.classList.add('active');
    twoPlayerBtn.classList.remove('active');
  }

  updateScoreboardLabels();
  restartGame();
}

// Reset Current Board (preserves scoreboard)
function restartGame() {
  // Clear any pending Robo move timer
  if (roboTimeoutId) {
    clearTimeout(roboTimeoutId);
    roboTimeoutId = null;
  }

  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  isRoboThinking = false;
  updateStatus();

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'winner');
  });
}

// Reset Scoreboard to 0
function resetScores() {
  scores.x = 0;
  scores.o = 0;
  scores.draws = 0;
  xScoreEl.textContent = '0';
  oScoreEl.textContent = '0';
  drawScoreEl.textContent = '0';
}

// Start the game on page load
initGame();
