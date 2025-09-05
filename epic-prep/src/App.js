// src/App.jsx
import React, { useState } from 'react';
import './styles/globals.css';

// Components
import Modal from './components/common/Modal';
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import Daily from './components/Daily';
import Practice from './components/Practice';
import Resources from './components/Resources';
import Progress from './components/Progress';

// Context and hooks
import { useProfiles } from './hooks/useProfiles';
import { ROLE_NAMES, MILESTONES } from './data/constants';

function App() {
  const {
    profiles,
    currentProfile,
    allProfiles,
    partnerMode,
    createProfile,
    setCurrentProfile,
    setPartnerMode
  } = useProfiles();

  const [currentSection, setCurrentSection] = useState('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', role: '' });

  const isOnDashboard = currentSection === 'dashboard';
  // Show profile selection if no profiles exist or none selected
  const shouldShowSelection = Object.keys(profiles).length === 0 ||
    (!currentProfile && !partnerMode);

  React.useEffect(() => {
    if (shouldShowSelection) {
      setShowProfileModal(true);
    }
  }, [shouldShowSelection]);

  // Navigation
  const showSection = (section) => {
    setCurrentSection(section);
  };

  // Profile creation
  const handleCreateProfile = () => {
    if (profileForm.name && profileForm.role) {
      const newProfileId = createProfile(profileForm.role, profileForm.name);
      setCurrentProfile(newProfileId);
      setShowProfileModal(false);
      setProfileForm({ name: '', role: '' });
    }
  };

  // Calculate milestone dates
  const getMilestoneDays = () => {
    const currentDate = new Date();
    const castRemovalDate = new Date(MILESTONES.castRemovalDate);
    const applicationDate = new Date(MILESTONES.applicationDate);

    return {
      daysUntilCast: Math.ceil((castRemovalDate - currentDate) / (1000 * 60 * 60 * 24)),
      daysUntilApplication: Math.ceil((applicationDate - currentDate) / (1000 * 60 * 60 * 24))
    };
  };

  const getCurrentPhaseProgress = () => {
    const currentDate = new Date();
    const phase1Start = new Date(MILESTONES.phase1Start);
    const phase1End = new Date(MILESTONES.phase1End);

    if (currentDate < phase1Start) return 0;
    if (currentDate <= phase1End) {
      const totalDays = (phase1End - phase1Start) / (1000 * 60 * 60 * 24);
      const elapsedDays = (currentDate - phase1Start) / (1000 * 60 * 60 * 24);
      return Math.max(0, Math.min(100, Math.round((elapsedDays / totalDays) * 100)));
    }
    return 100;
  };

  // Render current section
  const renderCurrentSection = () => {
    const commonProps = {
      currentProfile,
      allProfiles,
      partnerMode,
      showSection,
      milestones: getMilestoneDays(),
      phaseProgress: getCurrentPhaseProgress()
    };

    switch (currentSection) {
      case 'dashboard':
        return <Dashboard {...commonProps} />;
      case 'timeline':
        return <Timeline {...commonProps} />;
      case 'daily':
        return <Daily {...commonProps} />;
      case 'practice':
        return <Practice {...commonProps} />;
      case 'resources':
        return <Resources {...commonProps} />;
      case 'progress':
        return <Progress {...commonProps} />;
      default:
        return <Dashboard {...commonProps} />;
    }


    let touchStartX = null;
    let touchEndX = null;

    function handleTouchStart(e) {
      touchStartX = e.changedTouches.screenX;
    }

    function handleTouchEnd(e) {
      touchEndX = e.changedTouches.screenX;
      if (
        currentSection !== 'dashboard' &&
        touchEndX - touchStartX > 80 // threshold for "swipe right"
      ) {
        setCurrentSection('dashboard');
      }
    }
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav__brand">
            <h1>Epic Interview Prep</h1>
          </div>

          <div className="nav__menu">
            <div className="profile-info">
              {currentProfile && (
                <span className="current-profile">
                  {currentProfile.name}
                </span>
              )}
              {partnerMode && (
                <span className="partner-mode-indicator">
                  Partner Mode
                </span>
              )}
            </div>
            <button
              className="btn btn--outline nav__toggle"
              onClick={() => setShowProfileModal(true)}
            >
              Switch Profile
            </button>

            {/* Back to Dashboard Nav Button (only if not on dashboard) */}
            {!isOnDashboard && (
              <button
                className="btn btn--ghost btn--sm"
                onClick={() => setCurrentSection('dashboard')}
                style={{ marginRight: '1rem' }}
              >
                ← Back to Dashboard
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Profile Selection Modal */}
      {showProfileModal && (
        <Modal onClose={() => setShowProfileModal(false)} size="large">
          <div className="modal__header">
            <h2>Select Profile</h2>
          </div>
          <div className="modal__body">

            {/* Existing Profiles */}
            {allProfiles.length > 0 && (
              <div className="existing-profiles">
                <h3>Existing Profiles</h3>
                <div className="profile-grid">
                  {allProfiles.map(profile => (
                    <div
                      key={profile.id}
                      className={`profile-card ${currentProfile?.id === profile.id ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentProfile(profile.id);
                        setShowProfileModal(false);
                      }}
                    >
                      <div className="profile-card__header">
                        <h4>{profile.name}</h4>
                        <span className="role-badge">{ROLE_NAMES[profile.role]}</span>
                      </div>
                      <div className="profile-card__stats">
                        <div className="stat">
                          <span className="value">{Math.round(profile.studyHours)}</span>
                          <span className="label">Study Hours</span>
                        </div>
                        <div className="stat">
                          <span className="value">{profile.completedTasks}/{profile.totalTasks}</span>
                          <span className="label">Tasks</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="partner-mode-section">
                  <button
                    className="btn btn--secondary btn--full-width"
                    onClick={() => {
                      setPartnerMode(true);
                      setShowProfileModal(false);
                    }}
                  >
                    View Both Tracks (Partner Mode)
                  </button>
                </div>
              </div>
            )}

            {/* Create New Profile */}
            <div className="create-profile">
              <h3>Create New Profile</h3>
              <div className="form-group">
                <label>Profile Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={profileForm.name}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="role-selection">
                <label>Select Role</label>
                <div className="role-cards">
                  <div
                    className={`card role-card ${profileForm.role === 'software-engineer' ? 'selected' : ''}`}
                    onClick={() => setProfileForm(prev => ({ ...prev, role: 'software-engineer' }))}
                  >
                    <div className="card__body">
                      <h4>Software Engineer</h4>
                      <p>Coding assessments, system design, technical interviews</p>
                    </div>
                  </div>

                  <div
                    className={`card role-card ${profileForm.role === 'project-manager' ? 'selected' : ''}`}
                    onClick={() => setProfileForm(prev => ({ ...prev, role: 'project-manager' }))}
                  >
                    <div className="card__body">
                      <h4>Project Manager</h4>
                      <p>Case studies, behavioral interviews, presentations</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="btn btn--primary btn--full-width"
                onClick={handleCreateProfile}
                disabled={!profileForm.name || !profileForm.role}
              >
                Create Profile
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Main Content */}
      <main className="main">
        {renderCurrentSection()}
      </main>
    </div>
  );
}

export default App;