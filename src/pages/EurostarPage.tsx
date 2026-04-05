import { useState, useEffect, useMemo } from 'react';
import { generateEurostarLondon, generateEurostarFromLondon } from '../data/trainSchedule';
import { StatusBadge } from '../components/StatusBadge';
import { CrowdBadge } from '../components/CrowdBadge';
import { StationHeader } from '../components/StationHeader';

function formatTime(date: Date): string {
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export default function EurostarPage() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const departures = useMemo(() => generateEurostarLondon(now), [now]);
  const fromLondon = useMemo(() => generateEurostarFromLondon(now), [now]);

  return (
    <div>
      <StationHeader
        title="Eurostar"
        subtitle="Paris — London connections"
        address="Gare du Nord, 18 Rue de Dunkerque, 75010 Paris"
      />

      {/* Paris to London */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-1">Paris Gare du Nord → London St Pancras</h3>
          <p className="text-sm text-white/30 mb-6">Journey time: approximately 2h17. Check-in closes 30 minutes before departure.</p>

          {departures.length === 0 ? (
            <div className="text-center py-12 text-white/20">
              <p className="text-lg font-medium">No upcoming Eurostar departures to London</p>
              <p className="text-sm mt-2">Last Eurostar to London departs at 21:01</p>
            </div>
          ) : (
            <div className="space-y-3">
              {departures.map(t => (
                <div key={t.id} className={`bg-white/[0.03] border border-white/5 rounded-xl p-4 flex items-center gap-6 hover:bg-white/[0.05] transition-colors ${t.status === 'cancelled' ? 'opacity-40' : ''}`}>
                  <div className="bg-[#1D3660] px-3 py-1.5 rounded-lg">
                    <span className="text-xs font-black text-white tracking-wide">{t.trainNumber}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-lg font-bold text-white">{formatTime(t.scheduledTime)}</span>
                      {t.status === 'delayed' && (
                        <span className="font-mono text-sm text-amber-400">→ {formatTime(t.expectedTime)}</span>
                      )}
                    </div>
                    <p className="text-xs text-white/30 mt-0.5">Gare du Nord → London St Pancras</p>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Platform</div>
                      <span className="flap-cell inline-block px-3 py-1 rounded text-sky-200 font-mono font-bold text-sm">
                        {t.status === 'cancelled' ? '--' : t.platform}
                      </span>
                    </div>
                    <CrowdBadge level={t.crowdLevel} />
                    <StatusBadge status={t.status} delayMinutes={t.delayMinutes} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* London to Paris */}
      <div className="px-6 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-1">London St Pancras → Paris Gare du Nord</h3>
          <p className="text-sm text-white/30 mb-6">Taking the Eurostar from London? Here are today's services. Arrive at St Pancras at least 1 hour before departure for security & passport control.</p>

          {fromLondon.length === 0 ? (
            <div className="text-center py-12 text-white/20">
              <p className="text-lg font-medium">No upcoming departures from London</p>
            </div>
          ) : (
            <div className="space-y-3">
              {fromLondon.map(t => {
                const arrMin = t.scheduledTime.getHours() * 60 + t.scheduledTime.getMinutes() + 137;
                const arrH = Math.floor(arrMin / 60) % 24;
                const arrM = arrMin % 60;
                const arrStr = `${arrH.toString().padStart(2, '0')}:${arrM.toString().padStart(2, '0')}`;

                return (
                  <div key={t.id} className={`bg-white/[0.03] border border-white/5 rounded-xl p-4 flex items-center gap-6 hover:bg-white/[0.05] transition-colors ${t.status === 'cancelled' ? 'opacity-40' : ''}`}>
                    <div className="bg-[#1D3660] px-3 py-1.5 rounded-lg">
                      <span className="text-xs font-black text-white tracking-wide">{t.trainNumber}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-lg font-bold text-white">{formatTime(t.scheduledTime)}</span>
                        <span className="text-xs text-white/20">depart London</span>
                        <span className="text-white/15">→</span>
                        <span className="font-mono text-lg font-bold text-sky-300">{arrStr}</span>
                        <span className="text-xs text-white/20">arrive Paris</span>
                      </div>
                      <p className="text-xs text-white/30 mt-0.5">London St Pancras → Paris Gare du Nord (2h17)</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <CrowdBadge level={t.crowdLevel} />
                      <StatusBadge status={t.status} delayMinutes={t.delayMinutes} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tips */}
          <div className="mt-8 bg-sky-500/5 border border-sky-500/10 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-3">Getting to Paris from London St Pancras</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li className="flex gap-2"><span className="text-sky-400 font-bold">1.</span> Arrive at St Pancras International at least 1 hour before departure</li>
              <li className="flex gap-2"><span className="text-sky-400 font-bold">2.</span> Check-in and security are on the upper level — follow Eurostar signs</li>
              <li className="flex gap-2"><span className="text-sky-400 font-bold">3.</span> UK/EU passport holders can use e-gates; others queue for manual checks</li>
              <li className="flex gap-2"><span className="text-sky-400 font-bold">4.</span> Journey is 2h17 — you arrive at Gare du Nord in central Paris</li>
              <li className="flex gap-2"><span className="text-sky-400 font-bold">5.</span> From Gare du Nord, connect to Metro 4/5, RER B/D, or take a taxi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
