import { useState, useCallback, useEffect, useRef } from 'react';
import GameCanvas from './GameCanvas';
import Menu from './UI/Menu';
import Score from './UI/Score';
import GameOver from './UI/GameOver';
import Controls from './UI/Controls';
import { useGameLoop } from '../hooks/useGameLoop';
import { useSnake } from '../hooks/useSnake';
import {
    checkSelfCollision,
    checkBoundaryCollision,
    checkFoodCollision,
    generateFood,
    calculateScore,
    getHighScore,
    setHighScore
} from '../utils/gameLogic';
import { getNextMove } from '../utils/aiLogic';
import { DIRECTIONS, DIFFICULTY } from '../utils/constants';
import './Game.css';

export default function Game() {
    const [gameState, setGameState] = useState('menu'); // menu, playing, gameover
    const [food, setFood] = useState(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScoreState] = useState(getHighScore());
    const [isNewHighScore, setIsNewHighScore] = useState(false);
    const [difficulty, setDifficulty] = useState(DIFFICULTY.NORMAL);
    const [isAI, setIsAI] = useState(false);

    const { snake, direction, initSnake, changeDirection, moveSnake, grow } = useSnake();

    // Keep a ref of the snake to avoid stale closures in the game loop
    const snakeRef = useRef(snake);
    const directionRef = useRef(direction);

    // Update refs whenever state changes
    useEffect(() => {
        snakeRef.current = snake;
        directionRef.current = direction;
    }, [snake, direction]);

    // Initialize food
    const initFood = useCallback(() => {
        setFood(generateFood(snake)); // Use current snake state (likely empty or initial)
    }, [snake]);

    // Start game
    const startGame = useCallback((selectedDifficulty, aiMode = false) => {
        if (selectedDifficulty) setDifficulty(selectedDifficulty);
        setIsAI(aiMode);
        initSnake();
        initFood();
        setScore(0);
        setIsNewHighScore(false);
        setGameState('playing');
    }, [initSnake, initFood]);

    // Handle keyboard input
    useEffect(() => {
        if (gameState !== 'playing') return;

        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    e.preventDefault();
                    changeDirection(DIRECTIONS.UP);
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    e.preventDefault();
                    changeDirection(DIRECTIONS.DOWN);
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    e.preventDefault();
                    changeDirection(DIRECTIONS.LEFT);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    e.preventDefault();
                    changeDirection(DIRECTIONS.RIGHT);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, changeDirection]);

    // Game loop (tick-based)
    useGameLoop(() => {
        let currentDir = null;

        // AI Logic
        if (isAI && food) {
            let aiDirection = directionRef.current;
            const currentSnake = snakeRef.current;

            if (currentSnake.length >= 2) {
                const head = currentSnake[0];
                const neck = currentSnake[1];
                aiDirection = {
                    row: head.row - neck.row,
                    col: head.col - neck.col
                };
            }

            currentDir = getNextMove(currentSnake, food, aiDirection);

            // Safety: Prevent 180 turn physically
            if (currentSnake.length >= 2) {
                const head = currentSnake[0];
                const neck = currentSnake[1];
                const vector = { r: head.row - neck.row, c: head.col - neck.col };
                if (currentDir.row === -vector.r && currentDir.col === -vector.c) {
                    currentDir = aiDirection;
                }
            }

            changeDirection(currentDir);
        }

        // Check food collision BEFORE moving
        if (food && checkFoodCollision(snakeRef.current, food)) {
            // Use callback to get current score (avoid stale closure)
            setScore(prevScore => {
                const newScore = calculateScore(prevScore);

                // Grow every 10 points (when crossing 10, 20, 30, etc.)
                const oldMilestone = Math.floor(prevScore / 10);
                const newMilestone = Math.floor(newScore / 10);
                if (newMilestone > oldMilestone) {
                    grow();
                }

                return newScore;
            });

            setFood(generateFood(snakeRef.current));
        }

        // Move snake
        moveSnake(currentDir);

        // Check collisions AFTER moving
        if (checkBoundaryCollision(snake) || checkSelfCollision(snake)) {
            // Game over
            const finalScore = score;

            // Only update high score if NOT in AI mode
            if (!isAI && finalScore > highScore) {
                setHighScore(finalScore);
                setHighScoreState(finalScore);
                setIsNewHighScore(true);
            }

            setGameState('gameover');
            return;
        }
    }, gameState === 'playing', difficulty.tickRate);



    // Back to menu
    const backToMenu = useCallback(() => {
        setGameState('menu');
        setIsAI(false);
    }, []);

    // Handle virtual control buttons
    const handleVirtualControl = useCallback((direction) => {
        if (isAI) return;

        const dirMap = {
            'UP': DIRECTIONS.UP,
            'DOWN': DIRECTIONS.DOWN,
            'LEFT': DIRECTIONS.LEFT,
            'RIGHT': DIRECTIONS.RIGHT
        };
        if (dirMap[direction]) {
            changeDirection(dirMap[direction]);
        }
    }, [changeDirection, isAI]);

    return (
        <div className="game-container">
            {gameState === 'menu' && (
                <Menu
                    onStart={startGame}
                    highScore={highScore}
                />
            )}

            {gameState === 'playing' && (
                <div className="game-play-area">
                    <Score
                        score={score}
                        length={snake.length}
                    />

                    {isAI && (
                        <button
                            className="back-button"
                            onClick={backToMenu}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                left: '1rem',
                                padding: '0.5rem 1rem',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                zIndex: 100,
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <span>←</span> BACK
                        </button>
                    )}

                    <GameCanvas
                        snake={snake}
                        food={food}
                    />
                    <Controls
                        onDirectionChange={handleVirtualControl}
                        disabled={isAI}
                    />
                </div>
            )}

            {gameState === 'gameover' && (
                <>
                    <GameCanvas
                        snake={snake}
                        food={food}
                    />
                    <GameOver
                        score={score}
                        highScore={highScore}
                        isNewHighScore={isNewHighScore}
                        onRestart={backToMenu}
                    />
                </>
            )}
        </div>
    );
}
