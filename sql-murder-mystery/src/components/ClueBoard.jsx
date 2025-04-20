import React from 'react';

const ClueBoard = ({ clues, connections }) => {
  return (
    <div className="clue-board">
      <div className="board-header">
        <h3>Evidence Board</h3>
      </div>
      <div className="clues-container">
        {clues.map((clue, index) => (
          <div key={index} className="clue-card fancy">
            <div className="clue-art">
              {clue.image ? (
                <img src={clue.image} alt={clue.description} />
              ) : (
                <span role="img" aria-label="evidence" className="clue-icon">🔎</span>
              )}
            </div>
            <div className="clue-desc">{clue.description}</div>
          </div>
        ))}
        <svg className="connections-overlay">
          {connections.map((connection, index) => (
            <line
              key={index}
              x1={connection.start.x}
              y1={connection.start.y}
              x2={connection.end.x}
              y2={connection.end.y}
              className="connection-line"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default ClueBoard;
