// src/hooks/useTimer.js
import { useState, useEffect, useRef } from 'react';
import { useProfileActions } from './useProfiles';

export const useTimer = (profileId) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const intervalRef = useRef(null);
  const { addStudyHours } = useProfileActions();

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      setSessionStartTime(new Date());
    }
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    setSessionStartTime(null);
  };

  const complete = () => {
    if (sessionStartTime && profileId) {
      const totalMinutes = minutes + (seconds / 60);
      const hours = totalMinutes / 60;
      addStudyHours(profileId, hours);
    }
    reset();
  };

  const setPreset = (mins) => {
    reset();
    setMinutes(mins);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            setMinutes(prevMinutes => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return {
    minutes,
    seconds,
    isRunning,
    start,
    pause,
    reset,
    complete,
    setPreset,
    formattedTime: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    totalMinutes: minutes + (seconds / 60)
  };
};