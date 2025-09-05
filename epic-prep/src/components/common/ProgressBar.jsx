// src/components/common/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ 
  percentage, 
  label, 
  color = '#1FB8CD', 
  showPercentage = true,
  height = '8px',
  animated = false 
}) => {
  return (
    <div className="progress-bar-container">
      {label && <div className="progress-bar-label">{label}</div>}
      <div className="progress-bar" style={{ height }}>
        <div 
          className={`progress-bar__fill ${animated ? 'progress-bar__fill--animated' : ''}`}
          style={{ 
            width: `${Math.min(100, Math.max(0, percentage))}%`,
            backgroundColor: color
          }}
        ></div>
      </div>
      {showPercentage && (
        <div className="progress-bar-text">{Math.round(percentage)}% Complete</div>
      )}
    </div>
  );
};

export default ProgressBar;