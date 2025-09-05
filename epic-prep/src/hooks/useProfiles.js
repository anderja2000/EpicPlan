// src/hooks/useProfiles.js
import { useProfiles as useProfileContext } from '../contexts/ProfileContext';

export const useProfiles = () => {
  return useProfileContext();
};

// Additional profile-specific hooks
export const useCurrentProfile = () => {
  const { currentProfile } = useProfileContext();
  return currentProfile;
};

export const useProfileActions = () => {
  const { 
    createProfile, 
    setCurrentProfile, 
    updateProfile, 
    deleteProfile, 
    toggleTask, 
    addStudyHours,
    setPartnerMode 
  } = useProfileContext();

  return {
    createProfile,
    setCurrentProfile,
    updateProfile,
    deleteProfile,
    toggleTask,
    addStudyHours,
    setPartnerMode
  };
};