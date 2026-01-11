// Grid configuration
export const GRID = {
    ROWS: 20,
    COLS: 20,
    CELL_SIZE: 30
};

export const CANVAS = {
    WIDTH: GRID.COLS * GRID.CELL_SIZE,  // 600px
    HEIGHT: GRID.ROWS * GRID.CELL_SIZE   // 600px
};

export const SNAKE = {
    INITIAL_LENGTH: 2,
    COLOR: '#8a2be2'
};

export const DIFFICULTY = {
    EASY: { name: 'Easy', tickRate: 150, color: '#4ECDC4' },
    NORMAL: { name: 'Normal', tickRate: 100, color: '#8a2be2' },
    HARD: { name: 'Hard', tickRate: 60, color: '#FF6B6B' },
    EXTREME: { name: 'Extreme', tickRate: 45, color: '#FFD700' }
};

export const FOOD = {
    COLORS: [
        '#ff6b6b', // red
        '#4ecdc4', // cyan
        '#ffe66d', // yellow
        '#a8e6cf', // mint
        '#ff8ed4', // pink
        '#95e1d3', // turquoise
        '#ffa07a', // salmon
        '#dda0dd'  // plum
    ],
    POINTS: 10
};

export const GAME = {
    STORAGE_KEY: 'snake-game-highscore'
};

// Direction constants
export const DIRECTIONS = {
    UP: { row: -1, col: 0 },
    DOWN: { row: 1, col: 0 },
    LEFT: { row: 0, col: -1 },
    RIGHT: { row: 0, col: 1 }
};
