import React from 'react';
import { useGameContext } from '../context/GameContext';
import { DataStructureType } from '../types/gameTypes';
import { getDataStructures, getQuestionsByLevel } from '../data/gameData';

const LevelComplete: React.FC = () => {
  const { gameState, goToLevelSelect } = useGameContext();
  const dataStructures = getDataStructures();
  
  const badgeEarned = (dataStructure: DataStructureType): boolean => {
    if (!gameState.currentLevel) return false;
    
    const questions = getQuestionsByLevel(gameState.currentLevel);
    const questionForStructure = questions.find(q => q.dataStructure === dataStructure);
    
    if (!questionForStructure) return false;
    return gameState.answeredQuestions[questionForStructure.id];
  };
  
  const getBadgeIcon = (dataStructure: DataStructureType): string => {
    switch (dataStructure) {
      case 'Array': return '📋';
      case 'Stack': return '📚';
      case 'Queue': return '👥';
      case 'Map': return '🗺️';
      default: return '🏆';
    }
  };
  
  const getBadgeName = (dataStructure: DataStructureType): string => {
    switch (dataStructure) {
      case 'Array': return 'Array Ace';
      case 'Stack': return 'Stack Star';
      case 'Queue': return 'Queue Queen';
      case 'Map': return 'Map Master';
      default: return 'Champion';
    }
  };
  
  const allBadgesEarned = dataStructures.every(ds => badgeEarned(ds));
  const earnedCount = dataStructures.filter(ds => badgeEarned(ds)).length;

  return (
    <div className="level-complete">
      <div className="level-complete-header">
        {allBadgesEarned ? (
          <>
            <div className="confetti-container">
              <div className="confetti confetti-1"></div>
              <div className="confetti confetti-2"></div>
              <div className="confetti confetti-3"></div>
            </div>
            <h2>Level Complete! 🎉</h2>
          </>
        ) : (
          <h2>Level Progress</h2>
        )}
      </div>
      
      <div className="completion-bar">
        <div className="completion-track">
          <div 
            className="completion-fill" 
            style={{ width: `${(earnedCount / dataStructures.length) * 100}%` }}
          ></div>
        </div>
        <div className="completion-text">
          {earnedCount} of {dataStructures.length} badges earned
        </div>
      </div>
      
      <p className="completion-message">
        {allBadgesEarned 
          ? `Congratulations! You've mastered all data structures in the ${gameState.currentLevel} level!` 
          : 'Keep practicing to earn all the badges in this level!'}
      </p>
      
      <div className="badges-container">
        {dataStructures.map((ds, index) => (
          <div 
            key={ds}
            className={`badge ${badgeEarned(ds) ? 'earned' : ''}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="icon">{getBadgeIcon(ds)}</div>
            <p>{getBadgeName(ds)}</p>
          </div>
        ))}
      </div>
      
      <div className="level-complete-buttons">
        <button className="btn" onClick={goToLevelSelect}>
          <i className="btn-icon">⬅️</i> Back to Level Select
        </button>
        
        {!allBadgesEarned && (
          <button 
            className="btn btn-secondary" 
            onClick={goToLevelSelect}
          >
            <i className="btn-icon">🔄</i> Retry Level
          </button>
        )}
      </div>
    </div>
  );
};

export default LevelComplete;
