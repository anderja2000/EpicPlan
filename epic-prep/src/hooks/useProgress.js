// src/hooks/useProgress.js
import { useState, useEffect } from 'react';
import { useProfiles } from './useProfiles';

export const useProgress = (initialData) => {
  const { currentProfile, updateProfile } = useProfiles();
  const [progressData, setProgressData] = useState(initialData);
  const [achievements, setAchievements] = useState([]);

  // Update progress for current profile
  const updateProgress = (updates) => {
    if (currentProfile) {
      updateProfile(currentProfile.id, updates);
    }
  };

  // Add study hours
  const addStudyHours = (hours) => {
    if (currentProfile) {
      updateProgress({
        studyHours: currentProfile.studyHours + hours,
        lastStudyDate: new Date().toISOString()
      });
    }
  };

  // Complete a task
  const completeTask = (taskId) => {
    if (currentProfile) {
      const updatedTasks = currentProfile.tasks.map(task =>
        task.id === taskId ? { ...task, completed: true } : task
      );
      const completedCount = updatedTasks.filter(task => task.completed).length;
      
      updateProgress({
        tasks: updatedTasks,
        completedTasks: completedCount
      });
    }
  };

  // Update phase progress
  const updatePhaseProgress = (phase, percentage) => {
    if (currentProfile) {
      updateProgress({
        [phase]: percentage
      });
    }
  };

  // Check for achievements
  useEffect(() => {
    if (!currentProfile) return;

    const checkAchievements = () => {
      const newAchievements = [];
      
      // Check study hours achievement
      if (currentProfile.studyHours >= 10 && !currentProfile.achievements.find(a => a.id === 'first-10-hours')) {
        newAchievements.push({
          id: 'first-10-hours',
          title: 'Study Marathon',
          description: 'Complete 10 hours of studying',
          unlocked: true
        });
      }
      
      if (currentProfile.completedTasks >= 5 && !currentProfile.achievements.find(a => a.id === 'task-master')) {
        newAchievements.push({
          id: 'task-master',
          title: 'Task Master',
          description: 'Complete 5 study tasks',
          unlocked: true
        });
      }

      if (newAchievements.length > 0) {
        const updatedAchievements = [...currentProfile.achievements, ...newAchievements];
        updateProgress({ achievements: updatedAchievements });
      }
    };

    checkAchievements();
  }, [currentProfile]);

  return {
    progressData: currentProfile,
    achievements: currentProfile?.achievements || [],
    updateProgress,
    addStudyHours,
    completeTask,
    updatePhaseProgress
  };
};