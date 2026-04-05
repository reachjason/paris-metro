import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Departures' },
  { to: '/bir-hakeim', label: 'Bir-Hakeim M6' },
  { to: '/eurostar', label: 'Eurostar' },
  { to: '/stations', label: 'Station Info' },
  { to: '/itinerary/historic', label: 'Historic' },
  { to: '/itinerary/cultural', label: 'Cultural' },
  { to: '/itinerary/food', label: 'Food' },
];

export function Layout() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628] text-white font-sans flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0d1f3c] to-[#142d54] border-b border-sky-500/10 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4h12l-1.5 16H7.5L6 4z" />
                <path d="M6 4l-2 4h16l-2-4" />
                <path d="M9 12v4" />
                <path d="M15 12v4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Paris Transit</h1>
              <p className="text-sm text-sky-300/40">{dateStr}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-3xl font-bold text-sky-300 tracking-widest tabular-nums">
              {timeStr}
            </div>
            <p className="text-[11px] text-sky-300/30 mt-0.5 tracking-wide">PARIS, FRANCE</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#0b1a30]/80 border-b border-white/5 px-6 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'text-sky-300 border-sky-400'
                    : 'text-white/40 border-transparent hover:text-white/70'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#080f1e] border-t border-white/5 px-6 py-4 text-center text-xs text-white/15">
        Paris Transit — Simulated data for demonstration purposes
      </footer>
    </div>
  );
}
