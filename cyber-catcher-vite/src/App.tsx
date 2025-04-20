import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './game.css';
import { explainSafePopup } from './gemini';

const HOLES = 6;
const GAME_TIME = 60;
const MAX_STRIKES = 3;
const POPUP_DURATION = 2500; // ms - increased for slower gameplay
const MALICIOUS_POPUPS = [
  { label: 'phishing@evil.com', icon: '⚠️', tip: 'Suspicious email address!' },
  { label: '123456', icon: '🔒', tip: 'Weak password!' },
  { label: 'alerts@bank.', sublabel: 'Missing .com', icon: '📧', tip: 'Look for incomplete domains.' },
  { label: 'support@amaz0n.com', icon: '📧', tip: 'Misspelled domain (0 instead of o)' },
  { label: 'Password123', icon: '🔒', tip: 'Common password pattern' },
  { label: 'Click to Claim Prize!', icon: '🎁', tip: 'Suspicious call to action' },
  { label: 'bankofamerica-secure.tk', icon: '🔗', tip: 'Suspicious TLD (.tk)' },
  { label: 'paypa1.com/login', icon: '🔗', tip: 'Number instead of letter (1 vs l)' },
  { label: 'security@paypa1.com', icon: '⚠️', tip: 'Impersonation of PayPal' },
  { label: 'yourbank-login.ru', icon: '🔗', tip: 'Suspicious country TLD (.ru)' },
  { label: 'qwerty123', icon: '🔒', tip: 'Easy-to-guess password' },
  { label: 'appleid-support.com', icon: '📧', tip: 'Fake Apple support domain' },
  { label: 'admin@micros0ft.com', icon: '📧', tip: 'Misspelled Microsoft domain' },
  { label: 'password', icon: '🔒', tip: 'Very weak password' },
  { label: 'verify-account@secure-mail.com', icon: '⚠️', tip: 'Urgent verification request' },
  { label: 'youraccount@bankofamerica.com', sublabel: 'Requesting password', icon: '⚠️', tip: 'Bank never asks for password by email' },
  { label: 'support@goog1e.com', icon: '📧', tip: 'Misspelled Google domain (1 vs l)' },
  { label: 'reset@paypal-security.com', icon: '⚠️', tip: 'Fake PayPal reset email' },
  { label: 'Your account is locked!', icon: '🔒', tip: 'Scare tactic in subject' },
  { label: 'amazon-login-alert.com', icon: '🔗', tip: 'Fake Amazon alert domain' },
];

const SAFE_POPUPS = [
  { label: 'G3@tE_fi-ainB0w!', icon: '🔒 SSL', tip: 'Strong password!' },
  { label: 'support@amazon.com', icon: '📧', tip: 'Legitimate domain' },
  { label: 'kR4!p9L$mZ2@vB7', icon: '🔒', tip: 'Strong random password' },
  { label: 'github.com/login', icon: '🔗', tip: 'Legitimate domain' },
  { label: 'updates@twitter.com', icon: '📧', tip: 'Legitimate email domain' },
  { label: 'https://google.com', icon: '🔒', tip: 'Secure connection (https)' },
  { label: 'microsoft.com', icon: '🔗', tip: 'Official Microsoft domain' },
  { label: 'mybank.com', icon: '🔗', tip: 'Official bank domain' },
  { label: 'john.doe@gmail.com', icon: '📧', tip: 'Personal email address' },
  { label: 'Xy7$2kLp!z', icon: '🔒', tip: 'Complex password' },
  { label: 'https://github.com', icon: '🔒', tip: 'Secure connection (https)' },
  { label: 'hello@protonmail.com', icon: '📧', tip: 'Secure email provider' },
  { label: 'apple.com', icon: '🔗', tip: 'Official Apple domain' },
  { label: '8v#Jp6!dQw', icon: '🔒', tip: 'Random strong password' },
  { label: 'linkedin.com', icon: '🔗', tip: 'Professional network domain' },
  { label: 'https://bankofamerica.com', icon: '🔒', tip: 'Secure bank domain' },
  { label: 'contact@github.com', icon: '📧', tip: 'Official support email' },
  { label: 'twitter.com', icon: '🔗', tip: 'Legitimate social media' },
  { label: 'https://amazon.com', icon: '🔒', tip: 'Secure shopping site' },
  { label: 'a9!Lm2@XeP', icon: '🔒', tip: 'Strong password' },
];

function getRandomPopup(id: number): PopupData {
  // Reduced chance of malicious popups to 30% to make the game more forgiving
  const isMalicious = Math.random() < 0.3;
  const arr = isMalicious ? MALICIOUS_POPUPS : SAFE_POPUPS;
  const base = arr[Math.floor(Math.random() * arr.length)];
  return {
    ...base,
    id,
    type: isMalicious ? 'malicious' : 'safe',
  };
}

export interface PopupData {
  id: number;
  type: 'malicious' | 'safe';
  label: string;
  sublabel?: string;
  icon: string;
  tip?: string;
}

export type PopupType = 'malicious' | 'safe';

const App: React.FC = () => {
  // Audio refs for sound effects
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const wrongAudioRef = useRef<HTMLAudioElement | null>(null);
  // Track safe popups that were incorrectly clicked (strikes)
  const [strikePopups, setStrikePopups] = useState<PopupData[]>([]);
  // Explanations from Gemini
  const [explanations, setExplanations] = useState<string[]>([]);
  const [loadingExplanations, setLoadingExplanations] = useState(false);
  const [explanationError, setExplanationError] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [time, setTime] = useState(GAME_TIME);
  const [popups, setPopups] = useState<(PopupData | null)[]>(Array(HOLES).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const popupTimers = useRef<(NodeJS.Timeout | null)[]>(Array(HOLES).fill(null));

  // Timer logic
  useEffect(() => {
    if (gameOver) return;
    if (time === 0 || strikes >= MAX_STRIKES) {
      setGameOver(true);
      return;
    }
    const interval = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [time, strikes, gameOver]);

  // Popup spawn logic
  useEffect(() => {
    if (gameOver) return;
    const spawn = () => {
      setPopups((prev) => {
        // Find empty holes
        const empty = prev.map((p, i) => (p === null ? i : -1)).filter((i) => i !== -1);
        if (empty.length === 0) return prev;
        const idx = empty[Math.floor(Math.random() * empty.length)];
        const popup = getRandomPopup(Date.now() + idx);
        // Set timer to auto-remove
        if (popupTimers.current[idx]) clearTimeout(popupTimers.current[idx]!);
        popupTimers.current[idx] = setTimeout(() => {
          setPopups((curr) => {
            if (curr[idx] && curr[idx]?.type === 'malicious') {
              setStrikes((s) => s + 1);
            }
            return curr.map((p, i) => (i === idx ? null : p));
          });
        }, POPUP_DURATION);
        return prev.map((p, i) => (i === idx ? popup : p));
      });
    };
    // Slowed down spawn rate from 700ms to 2000ms
    const interval = setInterval(spawn, 2000);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Cleanup on game end
  useEffect(() => {
    if (gameOver) {
      popupTimers.current.forEach((t) => t && clearTimeout(t));
      setPopups(Array(HOLES).fill(null));
    }
  }, [gameOver]);

  // On game over, ask Gemini to explain why each strike popup was safe
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (gameOver && strikePopups.length > 0) {
      setLoadingExplanations(true);
      setExplanationError(null);
      Promise.all(
        strikePopups.slice(0, 3).map(popup =>
          explainSafePopup(popup.label, popup.tip)
            .catch(() => "Could not fetch explanation.")
        )
      ).then(setExplanations)
       .catch(() => setExplanationError("Could not fetch explanations from Gemini."))
       .finally(() => setLoadingExplanations(false));
    }
  }, [gameOver, strikePopups]);

  const handlePopupClick = (id: number, type: PopupType) => {
    setPopups((prev) =>
      prev.map((p) => (p && p.id === id ? null : p))
    );
    const popup = popups.find((p) => p && p.id === id);
    if (type === 'malicious') {
      setScore((s) => s + 1);
      // Play correct sound for 0.5s
      if (correctAudioRef.current) {
        correctAudioRef.current.currentTime = 0;
        correctAudioRef.current.play();
        setTimeout(() => {
          if (correctAudioRef.current) correctAudioRef.current.pause();
        }, 500);
      }
    } else {
      setStrikes((s) => s + 1);
      // Track the safe popup that was incorrectly clicked
      if (popup) setStrikePopups((prev) => prev.length < 3 ? [...prev, popup] : prev);
      // Play wrong sound for 0.5s
      if (wrongAudioRef.current) {
        wrongAudioRef.current.currentTime = 0;
        wrongAudioRef.current.play();
        setTimeout(() => {
          if (wrongAudioRef.current) wrongAudioRef.current.pause();
        }, 500);
      }
    }
  };

  const handleRestart = () => {
    setScore(0);
    setStrikes(0);
    setTime(GAME_TIME);
    setGameOver(false);
    setPopups(Array(HOLES).fill(null));
    setStrikePopups([]);
    setExplanations([]);
    setExplanationError(null);
  };

  return (
    <div className="game-container">
      {/* Audio elements for sound effects */}
      <audio ref={correctAudioRef} src="/correct.mp3" preload="auto" />
      <audio ref={wrongAudioRef} src="/wrong.mp3" preload="auto" />
      <div className="grid-background"></div>
      
      <div className="game-content">
        <h1 className="game-title">Whack-a-Hack</h1>
        
        <div className="game-board">
          <div className="game-grid">
            {popups.map((popup, idx) => (
              <div key={idx} className="hole">
                {popup && (
                  <>
                    {/* Mole appears first */}
                    <motion.div 
                      className="mole"
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 40, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <img src="/mole.png" alt="Mole" className="mole-image" />
                    </motion.div>
                    
                    {/* Popup appears at the same time as the mole */}
                    <motion.div 
                      className={`popup popup-${popup.type}`}
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 80, opacity: 0 }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 400, 
                        damping: 20
                        // Removed delay so popup and mole appear together
                      }}
                      onClick={() => handlePopupClick(popup.id, popup.type)}
                    >
                      <div className="popup-pointer"></div>
                      <div className="popup-icon">{popup.icon}</div>
                      <div className="popup-label">{popup.label}</div>
                      {popup.sublabel && <div className="popup-sublabel">{popup.sublabel}</div>}
                    </motion.div>
                  </>
                )}
                <div className="hole-graphic"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="score-bar">
          <div className="score-section">
            <div className="score-value">Score: {score}</div>
            <div className="strikes">
              <span className="strikes-label">Strikes:</span>
              {Array.from({ length: MAX_STRIKES }).map((_, i) => (
                <span key={i} style={{margin: '0 2px'}}>{i < strikes ? '⚠️' : ''}</span>
              ))}
            </div>
          </div>
          <div className="timer">
            <span className="timer-icon">⌛</span>
            <span className="timer-value">Time: {time}</span>
          </div>
        </div>
      </div>
      
      {gameOver && (
        <motion.div 
          className="game-over"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="game-over-title">Game Over!</div>
          <div className="game-over-score">Your Score: <span style={{fontWeight: 'bold'}}>{score}</span></div>
          <button className="restart-button" onClick={handleRestart}>Restart</button>
          {strikePopups.length > 0 && (
  <div className="strike-explanations-centered">
    <div className="strike-explanations-card">
      <div className="strike-explanations-header">
        <span role="img" aria-label="info" style={{fontSize: 28, marginRight: 8}}>💡</span>
        <h3 style={{display: 'inline', fontWeight: 600, fontSize: 22}}>Why these were actually safe</h3>
      </div>
      {loadingExplanations && <div style={{margin: '16px 0'}}>Loading explanations...</div>}
      {explanationError && <div style={{color: 'red', margin: '16px 0'}}>{explanationError}</div>}
      <ul className="strike-explanations-list">
        {strikePopups.slice(0, 3).map((popup, idx) => (
          <li key={idx} className="strike-explanation-item">
            <div className="strike-explanation-label">
              <span role="img" aria-label="safe" style={{fontSize: 22, marginRight: 6}}>✅</span>
              <span style={{fontWeight: 500, fontSize: 17}}>{popup.label}</span>
            </div>
            <div className="strike-explanation-text" dangerouslySetInnerHTML={{
              __html: explanations[idx] || (loadingExplanations ? "Loading..." : "No explanation available.")
            }} />
          </li>
        ))}
      </ul>
    </div>
  </div>
)}
        </motion.div>
      )}
      
      <div className="game-tip">
        <b>Tip:</b> Catch the malicious popups! Don't click safe ones. Learn more about cybersecurity as you play.
      </div>
    </div>
  );
};

export default App;

/* Additional CSS for improved explanation UI */
const style = document.createElement('style');
style.innerHTML = `
.strike-explanations-centered {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  margin-top: 36px;
}
.strike-explanations-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.13);
  padding: 32px 28px 24px 28px;
  max-width: 520px;
  width: 100%;
  margin: 0 auto;
}
.strike-explanations-header {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}
.strike-explanations-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.strike-explanation-item {
  margin-bottom: 22px;
  border-bottom: 1px solid #e3e6ea;
  padding-bottom: 14px;
}
.strike-explanation-label {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
}
.strike-explanation-text {
  font-size: 1.02em;
  color: #333;
  line-height: 1.6;
  margin-left: 28px;
}
@media (max-width: 700px) {
  .strike-explanations-card {
    padding: 18px 8px;
    max-width: 98vw;
  }
  .strike-explanations-centered {
    margin-top: 16px;
  }
}
`;
document.head.appendChild(style);
