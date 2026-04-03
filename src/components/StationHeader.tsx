import { useState, useEffect } from 'react';

export function StationHeader() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr = time.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <header className="bg-gradient-to-b from-[#0f0f2a] to-[#0a0a1a] border-b border-blue-900/30 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Gare du Nord</h1>
            <p className="text-sm text-blue-300/60 capitalize">{dateStr}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-3xl font-bold text-amber-400 tracking-widest tabular-nums">
            {timeStr}
          </div>
          <p className="text-xs text-blue-300/40 mt-1">Paris, France</p>
        </div>
      </div>
    </header>
  );
}
