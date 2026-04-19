// PageLoader.jsx
import React from 'react';

export const PageLoader = () => (
  <div style={{ background: 'var(--navy)', minHeight: '100vh' }} className="flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-xl border-2 border-(--blue) border-t-transparent animate-spin" />
      <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-display)', fontSize: '13px' }}>Loading…</p>
    </div>
  </div>
);

export default PageLoader;
