// src/contexts/ProfileContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveToStorage, loadFromStorage } from '../utils/storage';
import { DEFAULT_PROFILE_DATA } from '../data/constants';

const ProfileContext = createContext();

// Action types
const ACTIONS = {
  LOAD_PROFILES: 'LOAD_PROFILES',
  SET_CURRENT_PROFILE: 'SET_CURRENT_PROFILE',
  CREATE_PROFILE: 'CREATE_PROFILE',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  DELETE_PROFILE: 'DELETE_PROFILE',
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_STUDY_HOURS: 'ADD_STUDY_HOURS',
  UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
  SET_PARTNER_MODE: 'SET_PARTNER_MODE'
};

// Initial state
const initialState = {
  profiles: {},
  currentProfileId: null,
  partnerMode: false,
  currentSection: 'dashboard'
};

// Profile reducer
function profileReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_PROFILES:
      return {
        ...state,
        profiles: action.payload.profiles,
        currentProfileId: action.payload.currentProfileId
      };

    case ACTIONS.SET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfileId: action.payload,
        partnerMode: false
      };

    case ACTIONS.CREATE_PROFILE:
      const newProfile = {
        id: action.payload.id,
        createdAt: new Date().toISOString(),
        ...DEFAULT_PROFILE_DATA[action.payload.role],
        name: action.payload.name
      };
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [action.payload.id]: newProfile
        }
      };

    case ACTIONS.UPDATE_PROFILE:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [action.payload.id]: {
            ...state.profiles[action.payload.id],
            ...action.payload.updates
          }
        }
      };

    case ACTIONS.DELETE_PROFILE:
      const { [action.payload]: deleted, ...remainingProfiles } = state.profiles;
      return {
        ...state,
        profiles: remainingProfiles,
        currentProfileId: state.currentProfileId === action.payload ? null : state.currentProfileId
      };

    case ACTIONS.UPDATE_TASK:
      const profile = state.profiles[action.payload.profileId];
      const updatedTasks = profile.tasks.map(task =>
        task.id === action.payload.taskId
          ? { ...task, completed: action.payload.completed }
          : task
      );
      const completedCount = updatedTasks.filter(task => task.completed).length;
      
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [action.payload.profileId]: {
            ...profile,
            tasks: updatedTasks,
            completedTasks: completedCount
          }
        }
      };

    case ACTIONS.ADD_STUDY_HOURS:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [action.payload.profileId]: {
            ...state.profiles[action.payload.profileId],
            studyHours: state.profiles[action.payload.profileId].studyHours + action.payload.hours,
            lastStudyDate: new Date().toISOString()
          }
        }
      };

    case ACTIONS.SET_PARTNER_MODE:
      return {
        ...state,
        partnerMode: action.payload,
        currentProfileId: action.payload ? null : state.currentProfileId
      };

    default:
      return state;
  }
}

// Profile Provider Component
export function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  // Load profiles from localStorage on mount
  useEffect(() => {
    const savedData = loadFromStorage();
    if (savedData) {
      dispatch({
        type: ACTIONS.LOAD_PROFILES,
        payload: savedData
      });
    }
  }, []);

  // Save to localStorage whenever profiles change
  useEffect(() => {
    if (Object.keys(state.profiles).length > 0) {
      saveToStorage({
        profiles: state.profiles,
        currentProfileId: state.currentProfileId
      });
    }
  }, [state.profiles, state.currentProfileId]);

  // Action creators
  const actions = {
    createProfile: (role, name) => {
      const id = uuidv4();
      dispatch({
        type: ACTIONS.CREATE_PROFILE,
        payload: { id, role, name }
      });
      return id;
    },

    setCurrentProfile: (profileId) => {
      dispatch({
        type: ACTIONS.SET_CURRENT_PROFILE,
        payload: profileId
      });
    },

    updateProfile: (profileId, updates) => {
      dispatch({
        type: ACTIONS.UPDATE_PROFILE,
        payload: { id: profileId, updates }
      });
    },

    deleteProfile: (profileId) => {
      dispatch({
        type: ACTIONS.DELETE_PROFILE,
        payload: profileId
      });
    },

    toggleTask: (profileId, taskId) => {
      const profile = state.profiles[profileId];
      const task = profile.tasks.find(t => t.id === taskId);
      dispatch({
        type: ACTIONS.UPDATE_TASK,
        payload: {
          profileId,
          taskId,
          completed: !task.completed
        }
      });
    },

    addStudyHours: (profileId, hours) => {
      dispatch({
        type: ACTIONS.ADD_STUDY_HOURS,
        payload: { profileId, hours }
      });
    },

    setPartnerMode: (enabled) => {
      dispatch({
        type: ACTIONS.SET_PARTNER_MODE,
        payload: enabled
      });
    }
  };

  const contextValue = {
    ...state,
    ...actions,
    currentProfile: state.currentProfileId ? state.profiles[state.currentProfileId] : null,
    allProfiles: Object.values(state.profiles)
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

// Custom hook to use profile context
export function useProfiles() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
}