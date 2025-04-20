import React from 'react';
import { useGameContext } from '../context/GameContext';
import { LevelType } from '../types/gameTypes';
import { getLevels, getQuestionsByLevel } from '../data/gameData';

const LevelSelection: React.FC = () => {
  const { setCurrentLevel, gameState } = useGameContext();
  const levels = getLevels();

  const getLevelIcon = (level: LevelType) => {
    switch (level) {
      case 'School Day':
        return '🏫';
      case 'Sports Game':
        return '🏟️';
      default:
        return '🎮';
    }
  };

  const calculateProgress = (level: LevelType) => {
    const levelQuestions = getQuestionsByLevel(level);
    if (!levelQuestions.length) return 0;
    
    let completed = 0;
    for (const question of levelQuestions) {
      if (gameState.answeredQuestions[question.id]) {
        completed++;
      }
    }
    
    return (completed / levelQuestions.length) * 100;
  };

  // All levels are unlocked from the start

  return (
    <div className="level-selection">
      <h2>Choose Your Adventure</h2>
      
      <div className="levels-container">
        {levels.map((level) => {
          const progress = calculateProgress(level);
          
          return (
            <div 
              key={level}
              className="level-card game-level"
              onClick={() => setCurrentLevel(level)}
            >
              <div className="level-icon">{getLevelIcon(level)}</div>
              <div className="level-banner dark-theme"><span>{level}</span></div>
              
              <div className="progress-container">
                <div className="progress-stars">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className={`star ${progress >= ((i+1) * 25) ? 'earned' : ''}`}>⭐</span>
                  ))}
                </div>
                <div className="progress-text">{Math.floor(progress)}% Complete</div>
              </div>
              
              <button className="play-button dark-theme">
                Play Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelection;
