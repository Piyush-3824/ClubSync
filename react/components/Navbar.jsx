// ============================================================
// ClubSync — Navbar Component
// react/components/Navbar.jsx
// ============================================================

import React, { useState } from 'react';

/**
 * Navbar — Main navigation bar for the ClubSync app.
 *
 * Props:
 *   @param {boolean} isLoggedIn  - whether user is authenticated
 *   @param {string}  userRole    - 'student' | 'recruiter' | null
 *   @param {string}  userName    - display name
 *   @param {string}  activePage  - current page for active link highlight
 */
export default function Navbar({ isLoggedIn = false, userRole = null, userName = '', activePage = '' }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      {/* Brand */}
      <a href="/index.html" className="navbar-brand" id="nav-brand">
        <div className="brand-logo">CS</div>
        <span className="brand-name">ClubSync</span>
      </a>

      {/* Desktop Nav Links */}
      <ul className="navbar-nav">
        <li>
          <a href="/pages/explore.html"
            className={`nav-link ${activePage === 'explore' ? 'active' : ''}`}
            id="nav-explore">
            Explore
          </a>
        </li>
        <li>
          <a href="/pages/events.html"
            className={`nav-link ${activePage === 'events' ? 'active' : ''}`}
            id="nav-events">
            Events
          </a>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <a href="/pages/student/saved.html"
                className={`nav-link ${activePage === 'saved' ? 'active' : ''}`}
                id="nav-saved">
                Saved
              </a>
            </li>
            <li>
              <a href="/pages/student/applications.html"
                className={`nav-link ${activePage === 'applications' ? 'active' : ''}`}
                id="nav-applications">
                My Applications
              </a>
            </li>
          </>
        )}
      </ul>

      {/* Actions */}
      <div className="navbar-actions">
        <button className="btn btn-ghost btn-sm" id="nav-notifications" aria-label="Notifications">
          🔔
        </button>
        {isLoggedIn ? (
          <div className="nav-user" id="nav-user">
            <div className="avatar">{userName?.[0]?.toUpperCase() || 'U'}</div>
          </div>
        ) : (
          <a href="/pages/login.html" className="btn btn-primary btn-sm" id="nav-login-cta">
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
