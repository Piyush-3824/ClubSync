// ============================================================
// ClubSync — Toast Component
// react/components/Toast.jsx
// ============================================================

import React, { useEffect, useState } from 'react';

/**
 * Toast — Temporary notification that auto-dismisses.
 *
 * Props:
 *   @param {string}   message   - text to display
 *   @param {string}   type      - 'success' | 'error' | 'info' | 'warning'
 *   @param {number}   duration  - ms before auto-dismiss (default: 4000)
 *   @param {boolean}  visible   - controls visibility
 *   @param {Function} onDismiss - callback when toast is dismissed
 */
export default function Toast({ message, type = 'success', duration = 4000, visible, onDismiss }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => onDismiss?.(), 400);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onDismiss]);

  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };

  return (
    <div className={`toast ${show ? 'show' : ''}`} role="alert" aria-live="polite">
      <span>{icons[type] || icons.success}</span>
      <span>{message}</span>
    </div>
  );
}
