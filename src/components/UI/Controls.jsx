import './Controls.css';

export default function Controls({ onDirectionChange, disabled = false }) {
    const handleDirection = (direction) => {
        if (disabled) return;
        onDirectionChange(direction);
    };

    return (
        <div
            className="virtual-controls"
            style={{
                opacity: disabled ? 0.3 : 1,
                pointerEvents: disabled ? 'none' : 'auto',
                transition: 'opacity 0.3s ease'
            }}
        >
            <div className="dpad-container">
                <button
                    className="dpad-btn dpad-up"
                    onPointerDown={(e) => { e.preventDefault(); handleDirection('UP'); }}
                    aria-label="Up"
                >
                    ▲
                </button>
                <div className="dpad-middle">
                    <button
                        className="dpad-btn dpad-left"
                        onPointerDown={(e) => { e.preventDefault(); handleDirection('LEFT'); }}
                        aria-label="Left"
                    >
                        ◀
                    </button>
                    <div className="dpad-center"></div>
                    <button
                        className="dpad-btn dpad-right"
                        onPointerDown={(e) => { e.preventDefault(); handleDirection('RIGHT'); }}
                        aria-label="Right"
                    >
                        ▶
                    </button>
                </div>
                <button
                    className="dpad-btn dpad-down"
                    onPointerDown={(e) => { e.preventDefault(); handleDirection('DOWN'); }}
                    aria-label="Down"
                >
                    ▼
                </button>
            </div>
        </div>
    );
}
