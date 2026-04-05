import { useState, useEffect, useMemo, useRef } from 'react';
import { generateTrains } from '../data/trainSchedule';
import { TrainRow } from '../components/TrainRow';
import { StationHeader } from '../components/StationHeader';
import { LINE_CLOSING_TIMES, RESTAURANTS_BIR_HAKEIM, BEST_DESTINATIONS } from '../data/stationData';

export default function BirHakeimPage() {
  const [now, setNow] = useState(new Date());
  const prevIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(interval);
  }, []);

  const trains = useMemo(() => {
    const all = generateTrains(now, 'bir-hakeim');
    return all.filter(t => {
      const diff = (t.expectedTime.getTime() - now.getTime()) / 60000;
      return diff >= -2 && diff <= 90 && t.direction === 'departure';
    });
  }, [now]);

  const currentIds = new Set(trains.map(t => t.id));
  const newIds = new Set<string>();
  currentIds.forEach(id => { if (!prevIds.current.has(id)) newIds.add(id); });
  prevIds.current = currentIds;

  const m6Info = LINE_CLOSING_TIMES['Metro 6'];
  const alerts = trains.filter(t => t.status !== 'on-time');

  return (
    <div>
      <StationHeader
        title="Bir-Hakeim"
        subtitle="Metro Line 6 — Elevated station on the Seine"
        address="Quai de Grenelle / Pont de Bir-Hakeim, 75015 Paris"
      />

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="px-6 py-3 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto space-y-2">
            {alerts.slice(0, 3).map((t, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                t.status === 'cancelled' ? 'bg-red-500/10 text-red-300 border border-red-500/20' : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
              }`}>
                {t.status === 'cancelled'
                  ? `M6 to ${t.destination} at ${t.scheduledTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} — Cancelled`
                  : `M6 to ${t.destination} — Delayed +${t.delayMinutes}m`
                }
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Departures */}
      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">Next Departures from Bir-Hakeim</h3>
          <div className="overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] text-white/25 uppercase tracking-widest font-semibold">
                  <th className="px-4 py-2">Line</th>
                  <th className="px-4 py-2">Train</th>
                  <th className="px-4 py-2">Destination</th>
                  <th className="px-4 py-2">Sched.</th>
                  <th className="px-4 py-2">Exp.</th>
                  <th className="px-4 py-2">In</th>
                  <th className="px-4 py-2 text-center">Plat.</th>
                  <th className="px-4 py-2">Crowd</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {trains.slice(0, 20).map(train => (
                  <TrainRow key={train.id} train={train} now={now} isNew={newIds.has(train.id)} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Line info */}
          {m6Info && (
            <div className="mt-6 bg-white/[0.03] border border-white/5 rounded-xl px-5 py-4">
              <h4 className="text-sm font-bold text-white mb-2">Metro 6 Service Hours</h4>
              <div className="flex gap-6 text-sm text-white/50">
                <span>First train: <span className="text-sky-300 font-mono">{m6Info.firstTrain}</span></span>
                <span>Last train: <span className="text-sky-300 font-mono">{m6Info.lastTrain}</span></span>
              </div>
              <p className="text-xs text-white/25 mt-2">{m6Info.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Places to eat */}
      <div className="px-6 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">Eat Near Bir-Hakeim</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESTAURANTS_BIR_HAKEIM.map(r => (
              <div key={r.name} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 hover:bg-white/[0.05] transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">{r.name}</h4>
                  <span className="text-xs text-sky-300/60 font-mono">{r.distance}</span>
                </div>
                <p className="text-xs text-white/40 mb-2">{r.cuisine} · {r.price}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-400">{'*'.repeat(Math.round(r.rating))}</span>
                  <span className="text-[11px] text-white/25">{r.rating}</span>
                </div>
                <p className="text-[11px] text-white/20 mt-1">{r.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Best destination from here */}
      <div className="px-6 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">Best Destination from Bir-Hakeim</h3>
          {BEST_DESTINATIONS.filter(d => d.from.includes('Bir-Hakeim')).map(d => (
            <div key={d.name} className="bg-gradient-to-r from-sky-500/5 to-transparent border border-white/5 rounded-xl p-5">
              <h4 className="text-lg font-bold text-white">{d.name}</h4>
              <div className="flex gap-4 text-xs text-sky-300/60 mt-1 mb-3">
                <span>{d.line}</span>
                <span>{d.travelTime}</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
