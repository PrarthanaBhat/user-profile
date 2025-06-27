import React from 'react';
import '../styles/ProgressBar.css';

const ProgressBar = ({ steps, currentStep, isSubmitted }) => {
  return (
    <div className="progress-bar">
      {steps.map((label, index) => {
        let statusClass = '';
        if (index < currentStep || (index === steps.length - 1 && isSubmitted)) {
          statusClass = 'completed';
        } else if (index === currentStep) {
          statusClass = 'current';
        }

        const isTick = index < currentStep || (index === steps.length - 1 && isSubmitted);

        return (
          <React.Fragment key={index}>
            <div className={`step ${statusClass}`}>
              <div className="circle">
                {isTick ? '✔' : index + 1}
              </div>
              <span className="step-label">{label}</span>
            </div>
            {index !== steps.length - 1 && <div className="line"></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;
