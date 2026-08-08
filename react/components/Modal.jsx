// ============================================================
// ClubSync — Modal Component
// react/components/Modal.jsx
// ============================================================

import React, { useEffect } from 'react';

/**
 * Modal — Reusable overlay modal.
 *
 * Props:
 *   @param {boolean}     isOpen    - controls visibility
 *   @param {Function}    onClose   - called when modal should close
 *   @param {string}      title     - modal heading text
 *   @param {ReactNode}   children  - modal body content
 *   @param {ReactNode}   footer    - optional footer with action buttons
 */
export default function Modal({ isOpen, onClose, title, children, footer }) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKey(e) { if (e.key === 'Escape') onClose?.(); }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>

      <div className="modal-card glass-card">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">{title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
            id="modal-close-btn">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
