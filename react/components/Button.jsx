// ============================================================
// ClubSync — Button Component
// react/components/Button.jsx
// ============================================================

import React from 'react';

/**
 * Button — Reusable button with ClubSync design system variants.
 *
 * Props:
 *   @param {string}    variant   - 'primary' | 'ghost' | 'outline-green' (default: 'primary')
 *   @param {string}    size      - 'sm' | 'md' | 'lg' (default: 'md')
 *   @param {boolean}   disabled  - disables the button
 *   @param {boolean}   loading   - shows loading state
 *   @param {Function}  onClick   - click handler
 *   @param {ReactNode} children  - button label / content
 *   @param {string}    type      - html button type (default: 'button')
 *   @param {string}    id        - html id attribute
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  children,
  type = 'button',
  id,
  style,
  ...rest
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size !== 'md' ? `btn-${size}` : '',
    loading ? 'btn-loading' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      id={id}
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
      {...rest}>
      {loading ? '...' : children}
    </button>
  );
}
