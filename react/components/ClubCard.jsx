// ============================================================
// ClubSync — ClubCard Component
// react/components/ClubCard.jsx
// ============================================================

import React, { useState } from 'react';

/**
 * ClubCard — Displays a club in grid or list view.
 *
 * Props:
 *   @param {Object}   club        - club data object from CLUBS_DATA
 *   @param {boolean}  isSaved     - whether this club is bookmarked
 *   @param {Function} onSave      - callback when save button clicked
 *   @param {string}   view        - 'grid' | 'list'
 */
export default function ClubCard({ club, isSaved = false, onSave, view = 'grid' }) {
  const [saved, setSaved] = useState(isSaved);
  const pct = Math.round((club.applications / club.maxApplications) * 100);

  function handleSave(e) {
    e.preventDefault();
    setSaved(prev => !prev);
    onSave?.(club.id, !saved);
  }

  return (
    <div className={`club-card ${club.recruiting ? 'recruiting' : ''} ${view === 'list' ? 'list-view-card' : ''}`}
      data-club-id={club.id}>

      {club.recruiting && <div className="recruiting-ribbon">Recruiting</div>}

      {/* Banner */}
      <div className="club-banner">
        <div className="club-banner-gradient" style={{ background: club.bannerGradient }} />
        <div className="club-banner-pattern" />
        <div className="club-banner-icon">{club.emoji}</div>
      </div>

      {/* Body */}
      <div className="club-card-body">
        <div className="club-card-header">
          <h3 className="club-name">{club.name}</h3>
          <button
            className={`save-btn ${saved ? 'saved' : ''}`}
            onClick={handleSave}
            aria-label={`${saved ? 'Unsave' : 'Save'} ${club.name}`}
            id={`save-btn-${club.id}`}>
            {saved ? '⭐' : '☆'}
          </button>
        </div>

        <p className="club-desc">{club.description}</p>

        <div className="club-tags">
          <span className={`badge ${getCategoryBadge(club.category)}`}>
            {getCategoryLabel(club.category)}
          </span>
          {club.tags.slice(0, 2).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="club-meta">
          <div className="club-meta-item">
            <span className="meta-icon">👥</span>
            <span>{club.members} members</span>
          </div>
          <div className="club-meta-item">
            <span className="meta-icon">📅</span>
            <span>{club.events} events</span>
          </div>
          <div className="club-meta-spacer" />
          <div className="club-meta-item">
            <span style={{ color: club.accentColor }}>★ {club.rating}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="club-card-footer">
        {club.recruiting ? (
          <>
            <div className="app-progress" style={{ flex: 1 }}>
              <div className="app-progress-text">
                <span>Applications</span>
                <span>{club.applications}/{club.maxApplications}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${club.accentColor}88, ${club.accentColor})`
                  }} />
              </div>
            </div>
            <a href={`club-detail.html?id=${club.id}`}
              className="btn btn-sm btn-outline-green"
              id={`view-club-${club.id}`}>
              View →
            </a>
          </>
        ) : (
          <>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', flex: 1 }}>
              🔒 Recruitment closed
            </span>
            <a href={`club-detail.html?id=${club.id}`}
              className="btn btn-sm btn-ghost"
              id={`view-club-${club.id}`}>
              View →
            </a>
          </>
        )}
      </div>
    </div>
  );
}
