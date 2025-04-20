import React, { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';

const ScenarioScreen: React.FC = () => {
  const { getCurrentQuestion, gameState, resetQuestion } = useGameContext();
  const currentQuestion = getCurrentQuestion();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    // Animation progress timer - smoother animation
    const timer = setInterval(() => {
      setAnimProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setAnimationComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 40); // Update every 40ms for smooth animation
    
    return () => clearInterval(timer);
  }, []);

  if (!currentQuestion) return null;

  const renderAnimation = () => {
    const isSchoolLevel = gameState.currentLevel === 'School Day';
    const isSportsLevel = gameState.currentLevel === 'Sports Game';
    
    switch (currentQuestion.dataStructure) {
      case 'Stack':
        if (isSchoolLevel) {
          return (
            <div className="stack-animation">
              <div className="stack-label">Last In, First Out</div>
              {[...Array(4)].map((_, index) => {
                const shouldShow = animProgress > (index * 25);
                const isTopItem = index === 3;
                
                return (
                  <div
                    key={`stack-${index}`}
                    className="stack-item"
                    style={{
                      bottom: `${index * 40}px`,
                      opacity: shouldShow ? 1 : 0,
                      transform: shouldShow ? 'translateX(0)' : 'translateX(-50px)',
                      zIndex: 10 - index,
                      backgroundColor: 'var(--primary-color)',
                      border: 'none'
                    }}
                  >
                    <span className="item-text">{index === 0 ? 'Notebook' : `Book ${index}`}</span>
                    {isTopItem && <span className="last-added">Last Added</span>}
                  </div>
                );
              })}
            </div>
          );
        } else if (isSportsLevel) {
          return (
            <div className="stack-animation">
              <div className="stack-label">Last In, First Out</div>
              {[...Array(4)].map((_, index) => {
                const shouldShow = animProgress > (index * 25);
                const isTopItem = index === 3;
                
                return (
                  <div
                    key={`stack-${index}`}
                    className="stack-item sports-style"
                    style={{
                      bottom: `${index * 40}px`,
                      opacity: shouldShow ? 1 : 0,
                      transform: shouldShow ? 'translateX(0)' : 'translateX(-50px)',
                      zIndex: 10 - index,
                      backgroundColor: isTopItem ? 'var(--secondary-color)' : 'var(--primary-color)',
                      border: 'none'
                    }}
                  >
                    <span className="item-text">{isTopItem ? 'Red Card' : `${['Yellow', 'Green', 'Blue'][index]} Card`}</span>
                    {isTopItem && <span className="last-added">Top Card</span>}
                  </div>
                );
              })}
            </div>
          );
        }
        break;
        
      case 'Queue':
        if (isSchoolLevel) {
          return (
            <div className="queue-animation">
              <div className="queue-items-container">
                {[...Array(5)].map((_, index) => {
                  const shouldShow = animProgress > (index * 20);
                  const isFirstItem = index === 0;
                  const isLastItem = index === 4;
                  
                  return (
                    <React.Fragment key={`queue-${index}`}>
                      <div
                        className="queue-item"
                        style={{
                          opacity: shouldShow ? 1 : 0,
                          transform: shouldShow ? 'translateY(0)' : 'translateY(20px)',
                          backgroundColor: isFirstItem ? 'var(--success-color)' : (isLastItem ? 'var(--secondary-color)' : 'var(--primary-color)')
                        }}
                      >
                        <span className="student-num">{index + 1}</span>
                        {isFirstItem && (
                          <div className="queue-label-container">
                            <span className="queue-label">First</span>
                          </div>
                        )}
                        {isLastItem && (
                          <div className="queue-label-container">
                            <span className="queue-label">Last</span>
                          </div>
                        )}
                      </div>
                      {index < 4 && (
                        <div className="queue-arrow">›</div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        } else if (isSportsLevel) {
          return (
            <div className="queue-animation sports-bench">
              <div className="bench"></div>
              <div className="queue-items-container">
                {[...Array(5)].map((_, index) => {
                  const shouldShow = animProgress > (index * 20);
                  const isFirstItem = index === 0;
                  const isLastItem = index === 4;
                  
                  return (
                    <React.Fragment key={`queue-${index}`}>
                      <div
                        className="queue-item sports-player"
                        style={{
                          opacity: shouldShow ? 1 : 0,
                          transform: shouldShow ? 'translateY(0)' : 'translateY(20px)',
                          backgroundColor: isFirstItem ? 'var(--success-color)' : (isLastItem ? 'var(--secondary-color)' : 'var(--primary-color)')
                        }}
                      >
                        <span className="player-num">{index + 1}</span>
                        {isFirstItem && (
                          <div className="queue-label-container">
                            <span className="queue-label">First In</span>
                          </div>
                        )}
                      </div>
                      {index < 4 && (
                        <div className="queue-arrow">›</div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        }
        break;
        
      case 'Array':
        if (isSchoolLevel) {
          return (
            <div className="array-animation">
              {[...Array(5)].map((_, index) => {
                const shouldShow = animProgress > (index * 20);
                const isMiddleItem = index === 2; // Highlight middle item for example
                
                return (
                  <div
                    key={`array-${index}`}
                    className="array-item"
                    data-index={index}
                    style={{
                      opacity: shouldShow ? 1 : 0,
                      transform: shouldShow ? 'translateY(0)' : 'translateY(20px)',
                      backgroundColor: isMiddleItem ? 'var(--secondary-color)' : 'var(--primary-color)'
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                );
              })}
            </div>
          );
        } else if (isSportsLevel) {
          return (
            <div className="array-animation sports-jerseys">
              {[...Array(5)].map((_, index) => {
                const shouldShow = animProgress > (index * 20);
                const isMiddleItem = index === 2; // Highlight middle item for example
                
                return (
                  <div
                    key={`array-${index}`}
                    className="array-item jersey-item"
                    data-index={index}
                    style={{
                      opacity: shouldShow ? 1 : 0,
                      transform: shouldShow ? 'translateY(0)' : 'translateY(20px)',
                      backgroundColor: isMiddleItem ? 'var(--secondary-color)' : 'var(--primary-color)'
                    }}
                  >
                    {index + 10}
                  </div>
                );
              })}
            </div>
          );
        }
        break;
        
      case 'Map':
        if (isSchoolLevel) {
          return (
            <div className="map-animation">
              {[...Array(3)].map((_, index) => {
                const shouldShow = animProgress > (index * 30);
                const items = [
                  { key: 'ID001', value: 'Alice' },
                  { key: 'ID102', value: 'Bob' },
                  { key: 'ID254', value: 'Charlie' }
                ];
                
                return (
                  <div
                    key={`map-${index}`}
                    className="map-pair"
                    style={{
                      opacity: shouldShow ? 1 : 0,
                      transform: shouldShow ? 'translateX(0)' : 'translateX(-30px)'
                    }}
                  >
                    <div className="map-key">{items[index].key}</div>
                    <div className="map-value">{items[index].value}</div>
                  </div>
                );
              })}
            </div>
          );
        } else if (isSportsLevel) {
          return (
            <div className="map-animation sports-stats">
              {[...Array(3)].map((_, index) => {
                const shouldShow = animProgress > (index * 30);
                const items = [
                  { key: '#7', value: 'Goals: 5' },
                  { key: '#10', value: 'Goals: 9' },
                  { key: '#23', value: 'Goals: 3' }
                ];
                
                return (
                  <div
                    key={`map-${index}`}
                    className="map-pair sports-stats-item"
                    style={{
                      opacity: shouldShow ? 1 : 0,
                      transform: shouldShow ? 'translateX(0)' : 'translateX(-30px)'
                    }}
                  >
                    <div className="map-key jersey-key">{items[index].key}</div>
                    <div className="map-value stats-value">{items[index].value}</div>
                  </div>
                );
              })}
            </div>
          );
        }
        break;
        
      default:
        return <div>Animation placeholder</div>;
    }
    
    // Fallback if none of the conditions match
    return <div>Animation placeholder</div>;
  };

  return (
    <div className="scenario-screen">
      <h2>{gameState.currentLevel}</h2>
      
      <div className="scenario-card">
        <div className="scenario-text" style={{ color: 'white', fontWeight: 700, textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>{currentQuestion.scenario}</div>
      </div>
      
      <div className="scenario-animation">
        {renderAnimation()}
      </div>
      
      <button 
        className="btn" 
        onClick={resetQuestion}
        disabled={!animationComplete}
        style={{ opacity: animationComplete ? 1 : 0.7 }}
      >
        Continue to Question
      </button>
    </div>
  );
};

export default ScenarioScreen;
