import { GRID, SNAKE, FOOD, GAME, CANVAS } from './constants';

export function generateFood(snake = []) {
    let newFood;
    let isCollision;
    let attempts = 0;
    const MAX_ATTEMPTS = 100;

    do {
        newFood = {
            row: Math.floor(Math.random() * GRID.ROWS),
            col: Math.floor(Math.random() * GRID.COLS),
            color: FOOD.COLORS[Math.floor(Math.random() * FOOD.COLORS.length)]
        };

        isCollision = false;
        if (snake && snake.length > 0) {
            for (let segment of snake) {
                if (segment.row === newFood.row && segment.col === newFood.col) {
                    isCollision = true;
                    break;
                }
            }
        }
        attempts++;
    } while (isCollision && attempts < MAX_ATTEMPTS);

    return newFood;
}

export function checkSelfCollision(snake) {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.row === snake[i].row && head.col === snake[i].col) {
            return true;
        }
    }
    return false;
}

export function checkBoundaryCollision(snake) {
    const head = snake[0];
    return (
        head.row < 0 ||
        head.row >= GRID.ROWS ||
        head.col < 0 ||
        head.col >= GRID.COLS
    );
}

export function checkFoodCollision(snake, food) {
    const head = snake[0];
    return head.row === food.row && head.col === food.col;
}

export function calculateScore(currentScore) {
    return currentScore + FOOD.POINTS;
}

export function getHighScore() {
    const stored = localStorage.getItem(GAME.STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
}

export function setHighScore(score) {
    localStorage.setItem(GAME.STORAGE_KEY, score.toString());
}
