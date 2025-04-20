import React from 'react';
import './CaseClosedModal.css';

const CaseClosedModal = ({ onRestart, conclusion }) => (
  <div className="case-closed-modal-overlay">
    <div className="case-closed-modal">
      <h2>Case Closed!</h2>
      <p className="case-conclusion">
        {conclusion ? conclusion : (
          <>
            <b>The investigation is complete.</b><br /><br />
            Through your SQL detective work, you uncovered the truth!<br /><br />
            <span className="final-remark">
              Congratulations, Detective! Central City is safe once again—thanks to your SQL skills and sharp mind.<br />
              <br />
              <i>Remember: In the world of data, every clue counts.</i>
            </span>
          </>
        )}
      </p>
      <button className="case-closed-btn" onClick={onRestart}>Start New Case</button>
    </div>
  </div>
);

export default CaseClosedModal;
