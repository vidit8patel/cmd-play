import React from 'react';
import { GameProvider, useGameContext } from './context/GameContext';
import IntroScreen from './components/IntroScreen';
import LevelSelection from './components/LevelSelection';
import ScenarioScreen from './components/ScenarioScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import LevelComplete from './components/LevelComplete';
import './styles/game.css';

const GameContent: React.FC = () => {
  const { gameState } = useGameContext();

  const renderScreen = () => {
    switch (gameState.currentScreen) {
      case 'intro':
        return <IntroScreen />;
      case 'levelSelect':
        return <LevelSelection />;
      case 'scenario':
        return <ScenarioScreen />;
      case 'question':
        return <QuestionScreen />;
      case 'result':
        return <ResultScreen />;
      case 'levelComplete':
        return <LevelComplete />;
      default:
        return <IntroScreen />;
    }
  };

  return (
    <div className="app-container">
      {renderScreen()}
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;
