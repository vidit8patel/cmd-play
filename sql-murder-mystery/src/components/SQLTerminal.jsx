import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';

const SQLTerminal = ({ onQuerySubmit, currentChallenge, onGoHome, onHint }) => {
  const [query, setQuery] = useState('');

  // Update query with template when challenge changes
  useEffect(() => {
    if (currentChallenge?.template) {
      setQuery(currentChallenge.template);
    }
  }, [currentChallenge]);

  const handleSubmit = () => {
    onQuerySubmit(query);
  };

  return (
    <div className="sql-terminal">
      <div className="terminal-header">
        <h3>Detective's Terminal</h3>
        <div className="challenge-prompt">{currentChallenge?.prompt}</div>
        <div className="challenge-concept">Concept: {currentChallenge?.concept}</div>
      </div>
      <div className="code-editor">
        <CodeMirror
          value={query}
          height="100%"
          theme="dark"
          onChange={(value) => setQuery(value)}
          className="code-editor-inner"
        />
      </div>
      <div className="terminal-footer">
        <button className="hint-btn" onClick={() => onHint(currentChallenge?.hint)}>
          Need a Hint?
        </button>
        <button className="submit-btn" onClick={handleSubmit}>
          Execute Query
        </button>
        <button className="case-closed-btn secondary" onClick={onGoHome} style={{marginLeft: '1rem'}}>
          Back to Main Page
        </button>
      </div>
    </div>
  );
};

export default SQLTerminal;
