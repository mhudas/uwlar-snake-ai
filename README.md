# uWlar: Classic Edition 🐍✨

**uWlar** is a modern, high-performance Snake game built with **React** and **Vite**. It features a stunning neon aesthetic, responsive controls, and a **Grandmaster-level AI** capable of playing the game perfectly.

DEMO: https://uwlar-snake-ai.vercel.app/

<p align="center">
  <img src="screenshots/menu.png" width="30%" alt="Menu Screen"/>
  <img src="screenshots/screenshot.png" width="30%" alt="Gameplay Action"/>
  <img src="screenshots/gameover.png" width="30%" alt="Game Over Screen"/>
</p>


## 🌟 Features

*   **🤖 Grandmaster AI**: Watch the AI play! It uses advanced algorithms (BFS Pathfinding, Safety Checks, Longest Path Stalling, Panic Mode) to achieve scores of **3950+** on Extreme Mode (nearly filling the entire 20x20 grid).
*   **🎨 Neon Aesthetics**: Beautiful "Glassmorphism" UI, glowing food particles, and smooth animations using the Canvas API.
*   **⚡ Optimized Performance**:
    *   Rendering logic decoupled from React state using `requestAnimationFrame` for buttery smooth 60fps.
    *   Instant input response on mobile (0ms touch delay).
*   **📱 Fully Responsive**: Plays perfectly on Desktop (Keyboard) and Mobile (Touch D-Pad).

## 🛠️ Tech Stack

*   **React 18**
*   **Vite**
*   **HTML5 Canvas API**
*   **CSS3** (Variables, Flexbox, Glassmorphism)

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mhudas/uwlar-snake-ai.git
    cd uwlar-snake-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the game:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 🎮 How to Play

*   **Arrow Keys / WASD**: Move the snake.
*   **On-Screen D-Pad**: For mobile/touch control.
*   **Watch AI Play**: Sit back and learn from the master!


---

Made with ❤️ by mhudas.
