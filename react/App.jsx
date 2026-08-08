// ============================================================
// ClubSync — App Root
// react/App.jsx
//
// Future React SPA entry point.
// Currently the project uses vanilla HTML/CSS/JS.
// This file will be the root when migrating to React/Vite.
//
// Members: Add your page components under react/pages/
//   - public/   → Member 1 (Club Discovery)
//   - student/  → Member 2 (Student Dashboard)
//   - recruiter/→ Member 3 (Recruiter Dashboard)
// ============================================================

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// TODO: Import React Router when migrating to SPA
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  function showToast(message, type = 'success') {
    setToast({ visible: true, message, type });
  }

  return (
    <div className="app">
      <Navbar isLoggedIn={false} userRole={null} />

      <main>
        {/* TODO: Add <Routes> here when migrating from HTML pages to React SPA */}
        <p style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          React SPA — coming soon. Currently using vanilla HTML pages.
        </p>
      </main>

      <Footer />

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onDismiss={() => setToast(prev => ({ ...prev, visible: false }))}
      />
    </div>
  );
}
