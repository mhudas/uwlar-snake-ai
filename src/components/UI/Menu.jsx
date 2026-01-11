import { useState } from 'react';
import { DIFFICULTY } from '../../utils/constants';
import './Menu.css';

export default function Menu({ onStart, highScore }) {
    const [selectedDifficulty, setSelectedDifficulty] = useState(DIFFICULTY.NORMAL);

    const handleStart = () => {
        onStart(selectedDifficulty);
    };

    return (
        <div className="menu-container">
            <div className="menu-content glass-panel">
                <h1 className="game-title">
                    <span className="title-main">uWlar</span>
                    <span className="title-sub">Classic Edition</span>
                </h1>

                {highScore > 0 && (
                    <div className="high-score-badge">
                        <div className="badge-label">HIGH SCORE</div>
                        <div className="badge-value">{highScore}</div>
                    </div>
                )}

                <div className="difficulty-section">
                    <div className="section-label">SELECT DIFFICULTY</div>
                    <div className="difficulty-grid">
                        {Object.values(DIFFICULTY).map((diff) => (
                            <button
                                key={diff.name}
                                className={`diff-button ${selectedDifficulty.name === diff.name ? 'active' : ''}`}
                                onClick={() => setSelectedDifficulty(diff)}
                                style={{ '--diff-color': diff.color }}
                            >
                                <span className="diff-name">{diff.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <button className="start-button" onClick={handleStart}>
                    <span className="start-icon">▶</span>
                    <span className="start-text">START GAME</span>
                </button>

                <button className="ai-button" onClick={() => onStart(selectedDifficulty, true)}>
                    <span className="start-icon">🤖</span>
                    <span className="start-text">WATCH AI PLAY</span>
                </button>

                <div className="controls-info">
                    <div className="info-title">CONTROLS</div>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="key-badge">↑ ↓ ← →</span>
                            <span className="key-desc">Arrow Keys</span>
                        </div>
                        <div className="info-item">
                            <span className="key-badge">W A S D</span>
                            <span className="key-desc">Alternative</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
