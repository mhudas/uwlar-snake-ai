/**
 * AI Logic: Grandmaster Level
 * Strategies: BFS to Food, Safety Checks, Tail Stalling, Panic Mode
 */

const UP = { row: -1, col: 0 };
const DOWN = { row: 1, col: 0 };
const LEFT = { row: 0, col: -1 };
const RIGHT = { row: 0, col: 1 };
const DIRECTIONS = [UP, DOWN, LEFT, RIGHT];
const GRID_SIZE = 20;

export const getNextMove = (snake, food, currentDirection) => {
    const head = snake[0];
    // eslint-disable-next-line no-unused-vars
    const tail = snake[snake.length - 1];

    // 1. Try path to food
    const pathToFood = bfs(head, food, snake);

    if (pathToFood && pathToFood.length > 0) {
        const nextMove = pathToFood[0];
        const virtualSnake = simulateMove(snake, nextMove, food);
        const virtualTail = virtualSnake[virtualSnake.length - 1];

        // 2. Safety Check: Can we reach tail after eating?
        if (canReachTail(virtualSnake[0], virtualTail, virtualSnake)) {
            return nextMove;
        }

        // Heuristic: Open Space Persistence
        const area = countFreeSpace(virtualSnake);
        const totalEmpty = (GRID_SIZE * GRID_SIZE) - virtualSnake.length;
        if (totalEmpty > 0 && (area / totalEmpty) > 0.90) {
            return nextMove;
        }
    }

    // 3. Fallback: Chase Tail (Stalling)
    const validMoves = getValidMoves(head, snake);
    let bestMoves = [];
    let maxDistance = -1;

    for (const move of validMoves) {
        const virtualSnake = simulateMove(snake, move, food);
        const virtualTail = virtualSnake[virtualSnake.length - 1];
        const pathToTail = bfs(virtualSnake[0], virtualTail, virtualSnake, true);

        if (pathToTail !== null) {
            const dist = pathToTail.length;
            if (dist > maxDistance) {
                maxDistance = dist;
                bestMoves = [move];
            } else if (dist === maxDistance) {
                bestMoves.push(move);
            }
        }
    }

    if (bestMoves.length > 0) {
        return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }

    // 4. Panic Mode: Maximize Space
    let safeMoves = getValidMoves(head, snake);
    safeMoves = safeMoves.filter(move =>
        !(move.row === -currentDirection.row && move.col === -currentDirection.col)
    );

    if (safeMoves.length === 0) {
        safeMoves = getValidMoves(head, snake);
        if (safeMoves.length === 0) return currentDirection;
    }

    safeMoves.sort(() => Math.random() - 0.5);
    safeMoves.sort((a, b) => {
        const spaceA = countFreeSpace(simulateMove(snake, a, food));
        const spaceB = countFreeSpace(simulateMove(snake, b, food));
        return spaceB - spaceA;
    });

    return safeMoves[0];
};

function bfs(start, target, snake, targetIsWalkable = false) {
    const q = [{ pos: start, path: [] }];
    const visited = new Set([`${start.row},${start.col}`]);
    const obstacles = new Set();

    for (let i = 0; i < snake.length; i++) {
        if (targetIsWalkable && snake[i].row === target.row && snake[i].col === target.col) continue;
        obstacles.add(`${snake[i].row},${snake[i].col}`);
    }

    while (q.length > 0) {
        const { pos, path } = q.shift();
        if (pos.row === target.row && pos.col === target.col) return path;

        for (let dir of DIRECTIONS) {
            const nextRow = pos.row + dir.row;
            const nextCol = pos.col + dir.col;
            const key = `${nextRow},${nextCol}`;

            if (nextRow < 0 || nextRow >= GRID_SIZE || nextCol < 0 || nextCol >= GRID_SIZE) continue;
            if (obstacles.has(key) || visited.has(key)) continue;

            visited.add(key);
            q.push({ pos: { row: nextRow, col: nextCol }, path: [...path, dir] });
        }
    }
    return null;
}

function canReachTail(head, tail, snake) {
    return bfs(head, tail, snake, true) !== null;
}

function simulateMove(snake, move, food) {
    const newHead = { row: snake[0].row + move.row, col: snake[0].col + move.col };
    const newSnake = [newHead, ...snake];
    if (newHead.row !== food.row || newHead.col !== food.col) newSnake.pop();
    return newSnake;
}

function getValidMoves(head, snake) {
    const moves = [];
    for (let dir of DIRECTIONS) {
        const r = head.row + dir.row;
        const c = head.col + dir.col;
        if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
            let hitBody = false;
            for (let i = 0; i < snake.length - 1; i++) {
                if (snake[i].row === r && snake[i].col === c) {
                    hitBody = true;
                    break;
                }
            }
            if (!hitBody) moves.push(dir);
        }
    }
    return moves;
}

function countFreeSpace(snake) {
    const head = snake[0];
    const q = [head];
    const visited = new Set([`${head.row},${head.col}`]);
    const obstacles = new Set(snake.map(s => `${s.row},${s.col}`));
    let count = 0;

    while (q.length > 0) {
        const pos = q.shift();
        count++;
        for (let dir of DIRECTIONS) {
            const r = pos.row + dir.row;
            const c = pos.col + dir.col;
            const key = `${r},${c}`;
            if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE || obstacles.has(key) || visited.has(key)) continue;
            visited.add(key);
            q.push({ row: r, col: c });
        }
    }
    return count;
}

export const GRID_CONFIG = { cols: 20, rows: 20 };
