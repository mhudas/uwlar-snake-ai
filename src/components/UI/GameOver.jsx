import './GameOver.css';

export default function GameOver({ score, highScore, isNewHighScore, onRestart }) {
    return (
        <div className="gameover-overlay">
            <div className="gameover-content glass-panel">
                <div className="gameover-title">Game Over!</div>

                {isNewHighScore && (
                    <div className="new-high-score">
                        🎉 New High Score! 🎉
                    </div>
                )}

                <div className="final-score-container">
                    <div className="final-score-label">Final Score</div>
                    <div className="final-score-value">{score}</div>
                </div>

                {highScore > 0 && !isNewHighScore && (
                    <div className="high-score-info">
                        High Score: {highScore}
                    </div>
                )}

                <button className="restart-button" onClick={onRestart}>
                    <span className="button-icon">↻</span>
                    <span className="button-text">Play Again</span>
                </button>
            </div>
        </div>
    );
}
