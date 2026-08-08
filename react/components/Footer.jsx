// ============================================================
// ClubSync — Footer Component
// react/components/Footer.jsx
// ============================================================

import React from 'react';

/**
 * Footer — Site-wide footer with links and branding.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      padding: '2rem 0',
      marginTop: '4rem',
      background: 'rgba(8, 12, 16, 0.6)',
      backdropFilter: 'blur(12px)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--green-neon)', fontSize: '1rem' }}>
            ClubSync
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '0.75rem' }}>
            © {year} — Discover. Apply. Belong.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[
            { label: 'Explore', href: '/pages/explore.html' },
            { label: 'Events', href: '/pages/events.html' },
            { label: 'Login', href: '/pages/login.html' },
          ].map(link => (
            <a key={link.label} href={link.href} style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
            }}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
