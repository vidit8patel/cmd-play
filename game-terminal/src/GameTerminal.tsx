import React, { useState } from 'react';
import './GameTerminal.css';

interface Game {
  id: string;
  name: string;
  description: string;
  path: string;
}

const games: Game[] = [
  {
    id: 'cybercatcher',
    name: 'Whack-a-Hack',
    description: 'Spot and stop cyber threats in this fast-paced Whack-a-Mole game.',
    path: 'http://localhost:5174'
  },
  {
    id: 'flappybird',
    name: 'Flappy Bird',
    description: 'Learn CS coding concepts on the fly!',
    path: 'http://localhost:8080'
  },
  {
    id: 'datastructquest',
    name: 'DataStruct Quest',
    description: 'Solve interactive data structure puzzles and challenges!',
    path: 'http://localhost:5175'
  }
];

const GameTerminal: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>(['Last updated: ' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleCommand = (command: string) => {
    setCommandHistory([...commandHistory, `$ ${command}`]);
    
    if (command.startsWith('play ')) {
      const gameName = command.substring(5).toLowerCase();
      const game = games.find(g => g.name.toLowerCase() === gameName);
      
      if (game) {
        setSelectedGame(game.id);
        setCommandHistory([...commandHistory, `$ ${command}`, `Loading ${game.name}...`]);
      } else {
        setCommandHistory([...commandHistory, `$ ${command}`, `Game "${gameName}" not found. Try one of these:`].concat(
          games.map(g => `  - ${g.name}: ${g.description}`)
        ));
      }
    } else if (command === 'list') {
      setCommandHistory([...commandHistory, `$ ${command}`, 'Available games:'].concat(
        games.map(g => `  - ${g.name}: ${g.description}`)
      ));
    } else if (command === 'clear') {
      setCommandHistory(['Terminal cleared.']);
    } else if (command === 'exit' && selectedGame) {
      setSelectedGame(null);
      setCommandHistory([...commandHistory, `$ ${command}`, 'Returned to game selection.']);
    } else if (command === 'help') {
      setCommandHistory([...commandHistory, `$ ${command}`, 
        'Available commands:',
        '  - play [game name]: Launch a game',
        '  - list: Show available games',
        '  - clear: Clear terminal',
        '  - exit: Exit current game',
        '  - help: Show this help message'
      ]);
    } else {
      setCommandHistory([...commandHistory, `$ ${command}`, `Command not found: ${command}. Type 'help' for available commands.`]);
    }
    
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
    }
  };

  const handleGameSelection = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (game) {
      handleCommand(`play ${game.name}`);
    }
  };

  return (
    <div className="terminal-window">
      <div className="terminal-titlebar">
        <div className="terminal-buttons">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="terminal-title">zsh - 80×24</div>
      </div>
      
      <div className="terminal-content">
        {!selectedGame ? (
          <>
            <div className="terminal-output">
              {commandHistory.map((line, index) => (
                <div key={index} className={line.startsWith('$') ? 'command-line' : 'output-line'}>
                  {line}
                </div>
              ))}
            </div>
            
            <div className="game-list">
              <div className="list-header">Found {games.length} educational games:</div>
              {games.map(game => (
                <div key={game.id} className="game-item" onClick={() => handleGameSelection(game.id)}>
                  <span className="game-name">{game.name}</span>
                  <span className="game-desc">{game.description}</span>
                </div>
              ))}
            </div>
            
            <div className="terminal-input-line">
              <span className="prompt">$ </span>
              <input
                type="text"
                className="terminal-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
          </>
        ) : (
          <div className="game-container">
            <div className="game-header">
              <button className="exit-button" onClick={() => setSelectedGame(null)}>
                Exit Game
              </button>
              <div className="game-title">
                {games.find(g => g.id === selectedGame)?.name}
              </div>
            </div>
            <div className="game-frame-container">
              <div className="game-message">
                <h3>{games.find(g => g.id === selectedGame)?.name}</h3>
                <p>Click the button below to launch the game in a new browser tab</p>
                <a
                  href={games.find(g => g.id === selectedGame)?.path}
                  className="game-launch-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Launch {games.find(g => g.id === selectedGame)?.name}
                </a>
                

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameTerminal;
