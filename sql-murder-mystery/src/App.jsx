import { useState, useEffect } from 'react';
import initSqlJs from 'sql.js';
import SQLTerminal from './components/SQLTerminal';
import ClueBoard from './components/ClueBoard';
import IntroModal from './components/IntroModal';
import CaseClosedModal from './components/CaseClosedModal';
import Notification from './components/Notification';
import { fetchGeminiMystery } from './utils/gemini';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showCaseClosed, setShowCaseClosed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dynamic game state
  const [mystery, setMystery] = useState(null); // { intro, suspects, challenges, conclusion }
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [clues, setClues] = useState([]);
  const [connections, setConnections] = useState([]);
  const [db, setDb] = useState(null);
  const [dbError, setDbError] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch new mystery from Gemini
  const loadNewMystery = async () => {
    setLoading(true);
    setError(null);
    try {
      const newMystery = await fetchGeminiMystery();
      setMystery(newMystery);
      // Reset clues and challenge index
      setClues([]);
      setConnections([]);
      setCurrentChallengeIndex(0);
      setShowCaseClosed(false);
      // Optionally, you can also dynamically generate a DB schema here
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showIntro) {
      loadNewMystery();
    }
  }, [showIntro]);

  useEffect(() => {
    // Initialize SQL.js and create the database
    const initDb = async () => {
      try {
        // Initialize SQL.js
        const SQL = await initSqlJs({
          locateFile: file => `https://sql.js.org/dist/${file}`
        });

        // Fetch the SQL initialization file
        const response = await fetch('/init.sql');
        const sqlContent = await response.text();

        // Create a new database and run the initialization SQL
        const newDb = new SQL.Database();
        newDb.run(sqlContent);
        setDb(newDb);
      } catch (error) {
        console.error('Database initialization error:', error);
        setDbError(error.message);
      }
    };

    initDb();
  }, []);

  const normalizeQuery = (query) => {
    return query
      .toLowerCase()
      .replace(/["']/g, '') // remove all quotes
      .replace(/\s+/g, ' ') // collapse whitespace
      .replace(/;$/, '')     // remove trailing semicolon
      .replace(/\s*([,()=<>])\s*/g, '$1') // remove spaces around punctuation
      .trim();
  };

  const handleQuerySubmit = (query) => {
    if (!mystery) return;
    const challenges = mystery.challenges;
    const normalizedInput = normalizeQuery(query);
    const normalizedAnswer = normalizeQuery(challenges[currentChallengeIndex].answer);
    if (normalizedInput === normalizedAnswer) {
      // Add new clue
      setClues([...clues, { description: challenges[currentChallengeIndex].prompt, id: clues.length + 1 }]);
      if (clues.length > 0) {
        setConnections([
          ...connections,
          {
            start: { x: 100, y: 100 * clues.length },
            end: { x: 200, y: 100 * (clues.length + 1) }
          }
        ]);
      }
      // Next challenge or finish
      if (currentChallengeIndex < challenges.length - 1) {
        setCurrentChallengeIndex(currentChallengeIndex + 1);
        setNotification({ message: 'Excellent work, Detective! New evidence uncovered!', type: 'success' });
      } else {
        setShowCaseClosed(true);
      }
    } else {
      // Show the expected answer in the error message
      setNotification({ message: 'Not quite! Check your SQL and try to match the template.\nExpected answer: ' + challenges[currentChallengeIndex].answer, type: 'error', duration: 4000 });
    }
  };

  // Show a notification for hint
  const handleHint = (hint) => {
    setNotification({ message: hint, type: 'success', duration: 3500 });
  };

  // Handler to start a new case
  const handleRestart = async () => {
    setShowCaseClosed(false);
    setMystery(null);
    setClues([]);
    setConnections([]);
    setCurrentChallengeIndex(0);
    setError(null);
    setLoading(true);
    try {
      const newMystery = await fetchGeminiMystery();
      setMystery(newMystery);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Handler to go back to the main intro page
  const handleGoHome = () => {
    setShowCaseClosed(false);
    setMystery(null);
    setClues([]);
    setConnections([]);
    setCurrentChallengeIndex(0);
    setError(null);
    setShowIntro(true);
  };

  return (
    <div className="game-container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={notification.duration || 2500}
          onClose={() => setNotification(null)}
        />
      )}
      {/* Main game intro section (hidden when intro modal is open) */}
      {!showIntro && !mystery && !loading && !error && (
        <div className="game-intro">
          <div className="intro-art-row">
            <span className="intro-art magnifier" title="Detective's Magnifier">🔍</span>
            <span className="intro-art blood" title="Blood Spatter">
              <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="#b91c1c" opacity="0.8"/><ellipse cx="24" cy="10" rx="3" ry="1.1" fill="#b91c1c" opacity="0.7"/><ellipse cx="8" cy="24" rx="2" ry="0.7" fill="#b91c1c" opacity="0.6"/><ellipse cx="20" cy="27" rx="1.5" ry="0.5" fill="#b91c1c" opacity="0.4"/></svg>
            </span>
            <span className="intro-art sqlcode" title="SQL Query Example">SELECT *<br/>FROM suspects<br/>WHERE guilty = 1;</span>
          </div>
          <h1>Database Detective</h1>
          <p>
            Welcome to <b>Database Detective</b>!<br /><br />
            Use your SQL detective skills to solve unique, murder mysteries. Each mystery features new suspects, clues, and challenges—no two games are ever the same!<br /><br />
            <b>How to play:</b>
            <ul>
              <li>Read the story intro and review the suspects.</li>
              <li>Use SQL queries to uncover clues and evidence.</li>
              <li>Piece together the facts and catch the culprit!</li>
            </ul>
            <b>Ready to begin?</b> Click <i>Start New Case</i> to get your first AI-powered mystery!
          </p>
          <button className="case-closed-btn" onClick={handleRestart}>Start New Case</button>
        </div>
      )}
      {/* Only show the modal when showIntro is true */}
      {showIntro && <IntroModal onStart={() => setShowIntro(false)} narration={mystery?.intro} />}
      {loading && <div className="loading-modal">Generating a new mystery...</div>}
      {error && <div className="error-modal">{error}</div>}
      {showCaseClosed && <CaseClosedModal onRestart={handleRestart} onGoHome={handleGoHome} conclusion={mystery?.conclusion} />}
      {!showIntro && !loading && !showCaseClosed && mystery && (
        <>
          <header className="game-header">
            <h1>Database Detective</h1>
            <p className="story-intro">{mystery.intro}</p>
          </header>
          <main className="game-content">
            <SQLTerminal
              onQuerySubmit={handleQuerySubmit}
              currentChallenge={mystery.challenges[currentChallengeIndex]}
              onGoHome={handleGoHome}
              onHint={handleHint}
            />
            <ClueBoard clues={clues} connections={connections} suspects={mystery.suspects} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
