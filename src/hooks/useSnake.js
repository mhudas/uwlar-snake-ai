import { useState, useCallback, useRef } from 'react';
import { GRID, SNAKE, DIRECTIONS } from '../utils/constants';

export function useSnake() {
    const [snake, setSnake] = useState([]);
    const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
    const growthQueue = useRef(0);

    const initSnake = useCallback(() => {
        const centerRow = Math.floor(GRID.ROWS / 2);
        const centerCol = Math.floor(GRID.COLS / 2);

        const initialSnake = [];
        for (let i = 0; i < SNAKE.INITIAL_LENGTH; i++) {
            initialSnake.push({
                row: centerRow,
                col: centerCol - i
            });
        }

        setSnake(initialSnake);
        setDirection(DIRECTIONS.RIGHT);
        growthQueue.current = 0;
    }, []);

    const changeDirection = useCallback((newDirection) => {
        setDirection(currentDir => {
            if (currentDir.row + newDirection.row === 0 &&
                currentDir.col + newDirection.col === 0) {
                return currentDir;
            }
            return newDirection;
        });
    }, []);

    const grow = useCallback((amount = 1) => {
        growthQueue.current += amount;
    }, []);

    const moveSnake = useCallback((overrideDirection = null) => {
        setSnake(prevSnake => {
            if (prevSnake.length === 0) return prevSnake;

            const currentDir = overrideDirection || direction;
            const head = prevSnake[0];
            const newHead = {
                row: head.row + currentDir.row,
                col: head.col + currentDir.col
            };

            const newSnake = [newHead, ...prevSnake];

            if (growthQueue.current > 0) {
                growthQueue.current--;
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction]);

    return {
        snake,
        direction,
        initSnake,
        changeDirection,
        moveSnake,
        grow
    };
}
