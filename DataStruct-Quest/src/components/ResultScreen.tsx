import React, { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';

const ResultScreen: React.FC = () => {
  const { getCurrentQuestion, gameState, goToNextQuestion, resetQuestion } = useGameContext();
  const currentQuestion = getCurrentQuestion();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  
  const isCorrect = currentQuestion ? gameState.answeredQuestions[currentQuestion.id] : false;
  const isSchoolLevel = gameState.currentLevel === 'School Day';
  const isSportsLevel = gameState.currentLevel === 'Sports Game';

  useEffect(() => {
    // Animation progress timer for smoother transition
    const animTimer = setInterval(() => {
      setAnimationProgress(prev => {
        if (prev >= 100) {
          clearInterval(animTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 40); // Update every 40ms

    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 800);
    
    return () => {
      clearTimeout(timer);
      clearInterval(animTimer);
    };
  }, []);

  if (!currentQuestion) return null;
  
  const renderAnimation = () => {
    const animations: Record<string, React.ReactElement> = {
      'Stack': (
        <div className="stack-animation">
          {[...Array(4)].map((_, index) => {
            const isTopItem = index === 3;
            const reverseIndex = 3 - index; // For transition delay (top items animate first)
            const transitionDelay = `${reverseIndex * 0.15}s`;
            
            // Custom content based on level
            const content = isSchoolLevel
              ? index === 0 ? 'Notebook' : `Book ${index}`
              : isTopItem ? 'Red Card' : `${['Yellow', 'Green', 'Blue'][index]} Card`;
            
            const stackClass = isSchoolLevel ? 'school-style' : 'sports-style';
            
            return (
              <div
                key={`stack-${index}`}
                className={`stack-item ${stackClass}`}
                style={{
                  bottom: `${index * 50}px`,
                  transform: animationComplete ? 
                    (isCorrect ? 
                      `translateY(${-50 - (reverseIndex * 15)}px) scale(${0.9 - (reverseIndex * 0.1)})` : 
                      `translateX(${80 + (reverseIndex * 10)}px) rotate(${20 - (reverseIndex * 5)}deg)`) : 
                    `translateY(${animationProgress < 50 ? 0 : -5 + Math.sin(animationProgress/10) * 5}px)`,
                  opacity: animationComplete && isCorrect ? (isTopItem ? 0 : 0.7 - (reverseIndex * 0.2)) : 1,
                  transitionDelay: transitionDelay,
                  zIndex: 10 - index,
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 100%)`,
                  boxShadow: `0 ${4 + index}px ${8 + index * 2}px rgba(0, 0, 0, 0.${2 + index})` 
                }}
              >
                <span className="item-text">{content}</span>
                {isTopItem && <span className="last-added">{isSchoolLevel ? 'Last Added' : 'Top Card'}</span>}
              </div>
            );
          })}
        </div>
      ),
      'Queue': (
        <div className="queue-animation">
          {[...Array(5)].map((_, index) => {
            const isFirstItem = index === 0;
            const transitionDelay = `${index * 0.2}s`;
            
            // Different styling for school vs sports level
            const queueClass = isSchoolLevel ? 'school-queue' : 'sports-queue';
            const content = isSchoolLevel 
              ? index + 1 
              : isSportsLevel 
                ? ['1st', '2nd', '3rd', '4th', '5th'][index] 
                : index + 1;
            
            return (
              <div
                key={`queue-${index}`}
                className={`queue-item ${queueClass}`}
                style={{
                  left: `${index * 70 + 20}px`,
                  transform: animationComplete ? 
                    (isCorrect ? 
                      `translateX(${-70 - (index * 20)}px) scale(${isFirstItem ? 0 : 1 - (index * 0.1)})` : 
                      `translateY(${40 + (index * 5)}px) rotate(${15 - (index * 2)}deg)`) : 
                    `translateX(${animationProgress < 60 ? 0 : Math.sin(animationProgress/8 + index) * 5}px)`,
                  opacity: animationComplete && isCorrect ? (index < 2 ? 0 : 1 - (index * 0.2)) : 1,
                  transitionDelay: transitionDelay,
                  zIndex: 10 - index,
                  // Add shine/gradient effect
                  backgroundImage: isSchoolLevel
                    ? `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`
                    : `radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)`,
                  boxShadow: `0 ${4 + index * 2}px ${10 + index * 3}px rgba(0, 0, 0, 0.3)`
                }}
              >
                {content}
                {isFirstItem && <div className="first-label">First</div>}
              </div>
            );
          })}
        </div>
      ),
      'Array': (
        <div className="array-animation">
          {[...Array(5)].map((_, index) => {
            const targetIndex = 2; // Middle item for demo
            const isTargetItem = index === targetIndex;
            
            return (
              <div
                key={`array-${index}`}
                className="array-item"
                style={{
                  transform: isTargetItem && animationComplete ? 
                    (isCorrect ? 'translateY(-20px) scale(1.1)' : 'translateY(20px) rotate(20deg)') : 
                    'translateY(0)',
                  boxShadow: isTargetItem && animationComplete && isCorrect ? '0 0 15px #4CAF50' : ''
                }}
              >
                {index}
              </div>
            );
          })}
        </div>
      ),
      'Map': (
        <div className="map-animation">
          {[...Array(3)].map((_, index) => {
            const targetIndex = 1; // Middle pair for demo
            const isTargetItem = index === targetIndex;
            
            return (
              <div
                key={`map-${index}`}
                className="map-pair"
                style={{
                  transform: isTargetItem && animationComplete ? 
                    (isCorrect ? 'scale(1.1)' : 'translateX(20px) rotate(5deg)') : 
                    'scale(1)',
                  boxShadow: isTargetItem && animationComplete && isCorrect ? '0 0 15px #4CAF50' : ''
                }}
              >
                <div className="map-key">Key {index + 1}</div>
                <div className="map-arrow">→</div>
                <div className="map-value">Value {index + 1}</div>
              </div>
            );
          })}
        </div>
      )
    };
    
    return animations[currentQuestion.dataStructure] || <div>Animation placeholder</div>;
  };

  return (
    <div className="result-screen">
      <h2>{isCorrect ? 'Correct! 🎉' : 'Not quite right...'}</h2>
      
      <div className="result-animation">
        {renderAnimation()}
      </div>
      
      {isCorrect ? (
        <div className="tip-box">
          <h3>🧠 Data Structure Insight</h3>
          <p>{currentQuestion.explanation}</p>
        </div>
      ) : (
        <div className="hint-box">
          <h3>🧠 Hint</h3>
          <p>{currentQuestion.failureMessage}</p>
        </div>
      )}
      
      <div>
        {isCorrect ? (
          <button className="btn" onClick={goToNextQuestion}>
            Continue to Next Task
          </button>
        ) : (
          <button className="btn" onClick={resetQuestion}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultScreen;
