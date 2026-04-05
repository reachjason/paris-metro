import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { TrainType, TrainStatus, Direction } from '../data/types';
import { generateTrains } from '../data/trainSchedule';
import { TrainRow } from '../components/TrainRow';
import { FilterBar } from '../components/FilterBar';
import { StationHeader } from '../components/StationHeader';
import { LINE_CLOSING_TIMES } from '../data/stationData';

const ALL_TYPES: TrainType[] = ['RER B', 'RER D', 'Transilien H', 'Transilien K', 'TGV', 'Eurostar', 'Thalys', 'Metro 4', 'Metro 5'];

export default function DeparturesPage() {
  const [now, setNow] = useState(new Date());
  const [selectedTypes, setSelectedTypes] = useState<Set<TrainType>>(new Set(ALL_TYPES));
  const [selectedStatus, setSelectedStatus] = useState<TrainStatus | 'all'>('all');
  const [direction, setDirection] = useState<Direction | 'all'>('departure');
  const [searchQuery, setSearchQuery] = useState('');
  const prevIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(interval);
  }, []);

  const toggleType = useCallback((type: TrainType) => {
    setSelectedTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }, []);

  const allTrains = useMemo(() => generateTrains(now, 'gare-du-nord'), [now]);

  const filteredTrains = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allTrains.filter(t => {
      const diffMin = (t.expectedTime.getTime() - now.getTime()) / 60000;
      if (diffMin < -5 || diffMin > 120) return false;
      if (!selectedTypes.has(t.type)) return false;
      if (selectedStatus !== 'all' && t.status !== selectedStatus) return false;
      if (direction !== 'all' && t.direction !== direction) return false;
      if (query) {
        const haystack = `${t.destination} ${t.origin} ${t.trainNumber} ${t.type}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [allTrains, selectedTypes, selectedStatus, direction, searchQuery, now]);

  const currentIds = new Set(filteredTrains.map(t => t.id));
  const newIds = new Set<string>();
  currentIds.forEach(id => { if (!prevIds.current.has(id)) newIds.add(id); });
  prevIds.current = currentIds;

  const stats = useMemo(() => ({
    total: filteredTrains.length,
    onTime: filteredTrains.filter(t => t.status === 'on-time').length,
    delayed: filteredTrains.filter(t => t.status === 'delayed').length,
    cancelled: filteredTrains.filter(t => t.status === 'cancelled').length,
  }), [filteredTrains]);

  // Alerts
  const alerts = useMemo(() => {
    const delayed = allTrains.filter(t => t.status === 'delayed');
    const cancelled = allTrains.filter(t => t.status === 'cancelled');
    const msgs: { type: 'warning' | 'error'; text: string }[] = [];
    if (cancelled.length > 0) {
      const types = [...new Set(cancelled.map(t => t.type))].join(', ');
      msgs.push({ type: 'error', text: `${cancelled.length} cancellation${cancelled.length > 1 ? 's' : ''} affecting: ${types}` });
    }
    if (delayed.length > 3) {
      msgs.push({ type: 'warning', text: `${delayed.length} trains currently delayed at Gare du Nord` });
    }
    return msgs;
  }, [allTrains]);

  const gareLines = ['RER B', 'RER D', 'Transilien H', 'Transilien K', 'Metro 4', 'Metro 5', 'TGV', 'Eurostar', 'Thalys'];

  return (
    <div className="flex flex-col">
      <StationHeader
        title="Gare du Nord"
        subtitle="Live departures and arrivals"
        address="18 Rue de Dunkerque, 75010 Paris"
      />

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="px-6 py-3 space-y-2 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto space-y-2">
            {alerts.map((a, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                a.type === 'error' ? 'bg-red-500/10 text-red-300 border border-red-500/20' : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
              }`}>
                <span>{a.type === 'error' ? '!' : '!'}</span>
                {a.text}
              </div>
            ))}
          </div>
        </div>
      )}

      <FilterBar
        trainTypes={ALL_TYPES}
        selectedTypes={selectedTypes}
        toggleType={toggleType}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        direction={direction}
        setDirection={setDirection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Stats bar */}
      <div className="bg-white/[0.01] border-b border-white/5 px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-6 text-xs">
          <span className="text-white/25">{stats.total} trains</span>
          <span className="text-emerald-400/60">{stats.onTime} on time</span>
          <span className="text-amber-400/60">{stats.delayed} delayed</span>
          <span className="text-red-400/60">{stats.cancelled} cancelled</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto px-6 py-4">
        <div className="max-w-7xl mx-auto">
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
              {filteredTrains.slice(0, 50).map(train => (
                <TrainRow key={train.id} train={train} now={now} isNew={newIds.has(train.id)} />
              ))}
            </tbody>
          </table>
          {filteredTrains.length === 0 && (
            <div className="text-center py-16 text-white/20">
              <p className="text-lg font-medium">No trains found</p>
              <p className="text-sm mt-2">Adjust your filters to see trains</p>
            </div>
          )}
        </div>
      </div>

      {/* Line closing times */}
      <div className="px-6 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">Last Trains & Line Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {gareLines.map(line => {
              const info = LINE_CLOSING_TIMES[line];
              if (!info) return null;
              return (
                <div key={line} className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">{line}</span>
                    <span className="font-mono text-xs text-sky-300">{info.lastTrain}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-white/30 mb-1">
                    <span>First: {info.firstTrain}</span>
                    <span>Last: {info.lastTrain}</span>
                  </div>
                  <p className="text-[11px] text-white/20">{info.notes}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
