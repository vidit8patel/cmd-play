import React from 'react';
import { useGameContext } from '../context/GameContext';

const IntroScreen: React.FC = () => {
  const { startGame } = useGameContext();

  return (
    <div className="intro-screen">
      <h1 className="glitch-title">DataStruct Quest</h1>
      <p>
        Explore the world of data structures through everyday scenarios!<br/>
        Learn how Arrays, Stacks, Queues, and Maps work in real life.
      </p>
      
      <div className="intro-animation">
        <div className="intro-icons">
          <div className="intro-icon">📚</div>
          <div className="intro-icon">🥫</div>
          <div className="intro-icon">🔔</div>
        </div>
      </div>
      
      <button className="btn" onClick={startGame}>
        Start Your Day!
      </button>
    </div>
  );
};

export default IntroScreen;
