import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, LevelType, Question } from '../types/gameTypes';
import { getQuestionsByLevel } from '../data/gameData';

interface GameContextProps {
  gameState: GameState;
  setCurrentLevel: (level: LevelType) => void;
  startGame: () => void;
  goToLevelSelect: () => void;
  goToNextQuestion: () => void;
  answerQuestion: (answer: string) => void;
  resetQuestion: () => void;
  getCurrentQuestion: () => Question | null;
  checkLevelComplete: () => boolean;
}

const initialGameState: GameState = {
  currentLevel: null,
  currentQuestionIndex: 0,
  answeredQuestions: {},
  completedLevels: [],
  currentScreen: 'intro'
};

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (gameState.currentLevel) {
      // Get questions for the current level
      const levelQuestions = getQuestionsByLevel(gameState.currentLevel);
      
      // Randomize the order of questions
      const shuffledQuestions = [...levelQuestions];
      for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
      }
      
      setQuestions(shuffledQuestions);
    }
  }, [gameState.currentLevel]);

  const setCurrentLevel = (level: LevelType) => {
    setGameState(prev => ({
      ...prev,
      currentLevel: level,
      currentQuestionIndex: 0,
      currentScreen: 'scenario'
    }));
  };

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'levelSelect'
    }));
  };

  const goToLevelSelect = () => {
    setGameState(prev => ({
      ...prev,
      currentLevel: null,
      currentQuestionIndex: 0,
      currentScreen: 'levelSelect'
    }));
  };

  const goToNextQuestion = () => {
    if (gameState.currentQuestionIndex + 1 >= questions.length) {
      // Check if all questions were answered correctly
      const allCorrect = questions.every(q => gameState.answeredQuestions[q.id]);
      
      // Update completed levels
      const completedLevels = [...gameState.completedLevels];
      if (allCorrect && gameState.currentLevel && !completedLevels.includes(gameState.currentLevel)) {
        completedLevels.push(gameState.currentLevel);
      }
      
      setGameState(prev => ({
        ...prev,
        completedLevels,
        currentScreen: 'levelComplete'
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        currentScreen: 'scenario'
      }));
    }
  };

  const answerQuestion = (answer: string) => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    setGameState(prev => ({
      ...prev,
      answeredQuestions: {
        ...prev.answeredQuestions,
        [currentQuestion.id]: isCorrect
      },
      currentScreen: 'result'
    }));
  };

  const resetQuestion = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'question'
    }));
  };

  const getCurrentQuestion = (): Question | null => {
    if (!questions.length || gameState.currentQuestionIndex >= questions.length) return null;
    return questions[gameState.currentQuestionIndex];
  };

  const checkLevelComplete = (): boolean => {
    if (!gameState.currentLevel || !questions.length) return false;
    return questions.every(q => gameState.answeredQuestions[q.id]);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setCurrentLevel,
        startGame,
        goToLevelSelect,
        goToNextQuestion,
        answerQuestion,
        resetQuestion,
        getCurrentQuestion,
        checkLevelComplete
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
