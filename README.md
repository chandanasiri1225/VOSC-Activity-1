# 🎮 Tic-Tac-Toe

> A simple, fun, and interactive Tic-Tac-Toe game with a modern neon/LED arcade theme built using **HTML, CSS, and JavaScript**.

---

## ✨ About the Game

Welcome to **Tic-Tac-Toe**! This web-based project brings the classic game to life with modern neon aesthetics, an ambient LED background, a real-time scoreboard, and a smart automated Robo opponent.

- 👥 **Play against another player** locally on the same device.
- 🤖 **Play against the Robo** featuring smart rule-based tactical moves.
- 🏆 **Track your score** across multiple rounds with a persistent scoreboard.
- 💡 **Enjoy a sleek LED/arcade atmosphere** with zero setup or external libraries required!

---

## 🎯 Game Modes

| Mode | Description |
| :--- | :--- |
| 👥 **Two Player** | Two players take turns playing **X** and **O** on the same device. |
| 🤖 **Play vs Robo** | Play as **X** against a smart Robo (**O**) that blocks wins, seizes opportunities, and takes strategic positions. |

---

## 🚀 Features

- 🎮 **Fully playable 3×3 board** with neon glow accents and pop-in animations
- 👥 **Two Player mode** for local matches
- 🤖 **Smart Rule-Based Robo AI**:
  1. Takes immediate winning moves
  2. Blocks opponent winning moves
  3. Secures the center cell
  4. Prefers strategic corner positions
  5. Takes available side positions
- 🏆 **Live Scoreboard**: Tracks Player 1 / Human wins, Player 2 / Robo wins, and Draws
- 💡 **Animated LED Background**: Subtle floating ambient light gradients and matrix dots
- ❌ **X** and ⭕ **O** distinctive neon color themes and text glows
- ✨ **Winning cells highlighted** with pulsating gold neon
- 🔄 **Restart Game**: Clears the current board while preserving your score
- 🗑️ **Reset Score**: Resets the scoreboard counters back to 0
- 📱 **Responsive Design**: Flawless layout across smartphones, tablets, and desktop displays
- ⚡ **Pure Vanilla Stack**: Zero external libraries, frameworks, or dependencies

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| 🌐 **HTML5** | Semantic layout and scoreboard structure |
| 🎨 **CSS3** | Neon/LED glow styling, glassmorphism, keyframe animations, and responsive grid |
| ⚙️ **JavaScript (ES6)** | Game state management, smart decision rules, and score tracking |

---

## 📂 Project Structure

```text
VOSC Activity-1/
│
├── 📄 index.html
├── 🎨 style.css
├── ⚙️ script.js
└── 📖 README.md
```

---

## ▶️ How to Run

Running this project is super simple and requires no dependencies or build steps:

1. **Clone or download** this repository to your local machine.
2. **Open the project folder** (`VOSC-Activity-1`).
3. **Double-click `index.html`** (or open it with any modern web browser like Chrome, Edge, Firefox, or Safari).
4. **Start playing!** 🎉

> 💡 *Note: No npm packages, servers, or external libraries are required. It runs 100% natively in the browser.*

---

## 🕹️ How to Play

### 👥 Two Player Mode
- **Player 1** uses **X** and makes the first move.
- **Player 2** uses **O**.
- Players take turns clicking empty cells on the 3×3 grid.
- The first player to align three of their symbols in a row wins the round!

### 🤖 Play vs Robo
- The human player plays as **X** and always makes the first move.
- The Robo plays as **O** and automatically responds after a brief thinking pause.
- Robo uses intelligent priority logic to block you and seize winning paths!

---

## 🏆 Winning the Game

To win the game, place three of your marks in a continuous line before your opponent does:

```text
 X | X | X 
-----------
 O |   | O 
-----------
   |   |   
```

A win can be achieved in any of the following ways:
- ↔️ **A Row** (Horizontal - 3 possible combinations)
- ↕️ **A Column** (Vertical - 3 possible combinations)
- ↗️ **A Diagonal** (Diagonal - 2 possible combinations)

If all 9 cells are filled and neither player has 3 in a row, the match ends in a **Draw 🤝**.

---

## 💡 What This Project Demonstrates

This project showcases core frontend development fundamentals:

- 🎯 **DOM Manipulation & State Management:** Dynamic scores, board matrix, and status messaging.
- 🧠 **Rule-Based Decision Logic:** Multi-tiered heuristics for Robo move selection without heavyweight AI models.
- 🖱️ **Event Handling & Locks:** Async thinking delays with input lockouts.
- 🎨 **Modern CSS & Glassmorphism:** Layered radial gradients, LED dot grids, neon text shadows, and CSS Grid.
- 📱 **Responsive Design:** Mobile-first layout adaptable to all screen sizes.

---

## 🎓 VOSC Activity – 1

- **Activity:** Build a Simple Game
- **Game:** Tic-Tac-Toe
- **Technologies:** HTML • CSS • JavaScript

---

## 🌟 Have Fun!

> **Choose your mode. Make your move. Get three in a row! 🏆🎮**
