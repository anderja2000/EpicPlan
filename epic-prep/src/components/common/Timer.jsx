// src/components/common/Timer.jsx
import React from 'react';
import { useTimer } from '../../hooks/useTimer';
import { useCurrentProfile } from '../../hooks/useProfiles';

const Timer = ({ 
  onComplete, 
  preset, 
  label = "Study Timer",
  showPresets = true,
  autoSaveHours = true 
}) => {
  const currentProfile = useCurrentProfile();
  const { 
    minutes, 
    seconds, 
    isRunning, 
    start, 
    pause, 
    reset, 
    complete,
    setPreset,
    formattedTime,
    totalMinutes 
  } = useTimer(autoSaveHours ? currentProfile?.id : null);

  React.useEffect(() => {
    if (preset) {
      setPreset(preset);
    }
  }, [preset, setPreset]);

  React.useEffect(() => {
    if (onComplete && minutes > 0 && minutes === preset && seconds === 0) {
      onComplete();
    }
  }, [minutes, seconds, preset, onComplete]);

  const handleComplete = () => {
    if (autoSaveHours && totalMinutes > 0) {
      complete();
    } else {
      reset();
    }
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="timer">
      <h3 className="timer__label">{label}</h3>
      <div className="timer__display">
        <span className="timer__time">{formattedTime}</span>
      </div>
      <div className="timer__controls">
        <button 
          className="btn btn--primary btn--sm" 
          onClick={start}
          disabled={isRunning}
        >
          Start
        </button>
        <button 
          className="btn btn--secondary btn--sm" 
          onClick={pause}
          disabled={!isRunning}
        >
          Pause
        </button>
        <button 
          className="btn btn--outline btn--sm" 
          onClick={reset}
        >
          Reset
        </button>
        {totalMinutes > 0 && (
          <button 
            className="btn btn--success btn--sm" 
            onClick={handleComplete}
          >
            Complete
          </button>
        )}
      </div>
      {showPresets && (
        <div className="timer__presets">
          <button 
            className="preset-btn" 
            onClick={() => setPreset(25)}
          >
            25 min
          </button>
          <button 
            className="preset-btn" 
            onClick={() => setPreset(45)}
          >
            45 min
          </button>
          <button 
            className="preset-btn" 
            onClick={() => setPreset(60)}
          >
            1 hour
          </button>
        </div>
      )}
    </div>
  );
};

export default Timer;