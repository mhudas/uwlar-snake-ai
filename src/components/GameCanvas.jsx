import { useEffect, useRef } from 'react';
import { CANVAS, GRID, SNAKE } from '../utils/constants';

export default function GameCanvas({ snake, food }) {
    const canvasRef = useRef(null);
    const snakeRef = useRef(snake);
    const foodRef = useRef(food);
    const prevFoodRef = useRef(null);
    const scaleRef = useRef(1);
    const requestRef = useRef();

    useEffect(() => {
        snakeRef.current = snake;
        foodRef.current = food;

        if (food && prevFoodRef.current !== food) {
            scaleRef.current = 0;
            prevFoodRef.current = food;
        }
    }, [snake, food]);

    const render = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        scaleRef.current = scaleRef.current + (1 - scaleRef.current) * 0.1;

        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;

        for (let i = 0; i <= GRID.ROWS; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * GRID.CELL_SIZE);
            ctx.lineTo(CANVAS.WIDTH, i * GRID.CELL_SIZE);
            ctx.stroke();
        }

        for (let i = 0; i <= GRID.COLS; i++) {
            ctx.beginPath();
            ctx.moveTo(i * GRID.CELL_SIZE, 0);
            ctx.lineTo(i * GRID.CELL_SIZE, CANVAS.HEIGHT);
            ctx.stroke();
        }

        const currentFood = foodRef.current;
        if (currentFood) {
            const scale = scaleRef.current;
            const size = (GRID.CELL_SIZE - 4) * scale;
            const offset = (GRID.CELL_SIZE - size) / 2;

            ctx.save();
            ctx.shadowColor = currentFood.color;
            ctx.shadowBlur = 20 * scale;
            ctx.fillStyle = currentFood.color;

            ctx.fillRect(
                currentFood.col * GRID.CELL_SIZE + offset,
                currentFood.row * GRID.CELL_SIZE + offset,
                size,
                size
            );

            const coreSize = (GRID.CELL_SIZE - 16) * scale;
            const coreOffset = (GRID.CELL_SIZE - coreSize) / 2;

            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.4;
            ctx.fillRect(
                currentFood.col * GRID.CELL_SIZE + coreOffset,
                currentFood.row * GRID.CELL_SIZE + coreOffset,
                coreSize,
                coreSize
            );

            ctx.restore();
        }

        const currentSnake = snakeRef.current;
        if (currentSnake) {
            currentSnake.forEach((segment, index) => {
                if (index === 0) {
                    ctx.fillStyle = SNAKE.COLOR;
                } else {
                    ctx.fillStyle = '#6a1bb2';
                }

                ctx.fillRect(
                    segment.col * GRID.CELL_SIZE + 1,
                    segment.row * GRID.CELL_SIZE + 1,
                    GRID.CELL_SIZE - 2,
                    GRID.CELL_SIZE - 2
                );
            });
        }

        requestRef.current = requestAnimationFrame(render);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(render);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={CANVAS.WIDTH}
            height={CANVAS.HEIGHT}
            style={{
                border: '2px solid rgba(138, 43, 226, 0.3)',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(138, 43, 226, 0.2)'
            }}
        />
    );
}
