import React, { useState, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';

const QuestionScreen: React.FC = () => {
  const { getCurrentQuestion, answerQuestion } = useGameContext();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  
  const currentQuestion = getCurrentQuestion();
  
  useEffect(() => {
    if (currentQuestion) {
      // Shuffle the options when the question loads
      const options = [...currentQuestion.options];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      setShuffledOptions(options);
    }
  }, [currentQuestion]);

  if (!currentQuestion) return null;

  const handleAnswer = () => {
    if (selectedOption) {
      answerQuestion(selectedOption);
    }
  };

  return (
    <div className="question-screen">
      <h2>Which data structure best fits this situation?</h2>
      
      <p className="question-scenario-text">"{currentQuestion.scenario}"</p>
      
      <div className="options-container">
        {shuffledOptions.map((option) => (
          <button
            key={option}
            className={`option-button ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
      
      <button 
        className="btn submit-btn"
        onClick={handleAnswer}
        disabled={!selectedOption}
        style={{ 
          opacity: selectedOption ? 1 : 0.7, 
          marginTop: '40px',
          marginBottom: '40px',
          width: '220px',
          padding: '15px 30px',
          fontSize: '1.1rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        Submit Answer
      </button>
    </div>
  );
};

export default QuestionScreen;
