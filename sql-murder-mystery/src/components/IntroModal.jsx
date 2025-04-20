import React from 'react';
import './IntroModal.css';

const IntroModal = ({ onStart }) => (
  <div className="intro-modal-overlay">
    <div className="intro-modal">
      <h2>Database Detective</h2>
      <p className="intro-narration">
        <span className="intro-highlight">Welcome, Detective!</span><br /><br />
        <b>Database Detective</b> is an interactive, replayable game that teaches SQL through storytelling and puzzles.<br /><br />
        <b>Your Mission:</b> Solve a brand new murder case each time you play!<br /><br />
        <ul>
          <li>Investigate suspects and clues</li>
          <li>Write SQL queries to uncover evidence</li>
          <li>Piece together the facts to catch the culprit</li>
        </ul>
        <span className="intro-highlight">Every game is unique. Every query counts.</span><br /><br />
        Are you ready to crack your first case and become a legend among Central City's finest?
      </p>
      <button className="intro-btn" onClick={onStart}>Begin Investigation</button>
    </div>
  </div>
);

export default IntroModal;
