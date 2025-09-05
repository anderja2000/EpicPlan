// src/components/Timeline.jsx
import React from 'react';

const Timeline = ({ currentProfile, partnerMode, milestones, phaseProgress, showSection }) => {
  return (
    <div className="container">
      <div className="card">
        <h2>16-Week Preparation Timeline</h2>
        <p>Your structured journey to Epic Systems interview success</p>

        <div className="timeline-phase">
          <h3>Phase 1: Foundation Building (Sep 15 - Nov 10)</h3>
          <div className="progress-bar">
            <div
              className="progress-bar__fill"
              style={{ width: `${phaseProgress}%` }}
            ></div>
          </div>
          <p>{phaseProgress}% Complete</p>

          <ul>
            <li>Software Engineering Fundamentals</li>
            <li>Data structures and algorithms theory</li>
            <li>Epic company research</li>
            <li>Healthcare IT basics</li>
          </ul>
        </div>

        <div className="timeline-phase">
          <h3>Phase 2: Intensive Preparation (Nov 10 - Dec 22)</h3>
          <div className="progress-bar">
            <div
              className="progress-bar__fill"
              style={{ width: "0%" }}
            ></div>
          </div>
          <p>0% Complete</p>

          <ul>
            <li>LeetCode Practice (Easy/Medium problems)</li>
            <li>Mock assessments</li>
            <li>System design basics</li>
            <li>Final interview preparation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Timeline;