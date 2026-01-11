import './Score.css';

export default function Score({ score, length }) {
    return (
        <div className="score-display">
            <div className="score-item">
                <div className="score-label">SCORE</div>
                <div className="score-value">{score}</div>
            </div>
            <div className="score-item">
                <div className="score-label">LENGTH</div>
                <div className="score-value">{length}</div>
            </div>
        </div>
    );
}
