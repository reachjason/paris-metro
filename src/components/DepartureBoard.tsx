import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { Train, TrainType, TrainStatus, Direction } from '../data/types';
import { generateTrains } from '../data/trainSchedule';
import { TrainRow } from './TrainRow';
import { FilterBar } from './FilterBar';

const ALL_TYPES: TrainType[] = ['RER B', 'RER D', 'Transilien H', 'Transilien K', 'TGV', 'Eurostar', 'Thalys'];

export function DepartureBoard() {
  const [now, setNow] = useState(new Date());
  const [selectedTypes, setSelectedTypes] = useState<Set<TrainType>>(new Set(ALL_TYPES));
  const [selectedStatus, setSelectedStatus] = useState<TrainStatus | 'all'>('all');
  const [direction, setDirection] = useState<Direction | 'all'>('all');
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

  const allTrains = useMemo(() => generateTrains(now), [now]);

  const filteredTrains = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allTrains.filter((t: Train) => {
      // Only show trains from 5 min ago to 120 min ahead
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

  // Track new train IDs for animation
  const currentIds = new Set(filteredTrains.map(t => t.id));
  const newIds = new Set<string>();
  currentIds.forEach(id => {
    if (!prevIds.current.has(id)) newIds.add(id);
  });
  prevIds.current = currentIds;

  // Stats
  const stats = useMemo(() => {
    const visible = filteredTrains;
    return {
      total: visible.length,
      onTime: visible.filter(t => t.status === 'on-time').length,
      delayed: visible.filter(t => t.status === 'delayed').length,
      cancelled: visible.filter(t => t.status === 'cancelled').length,
    };
  }, [filteredTrains]);

  return (
    <div className="flex flex-col flex-1">
      <FilterBar
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
      <div className="bg-[#0b0b1e] border-b border-blue-900/20 px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-6 text-xs">
          <span className="text-blue-300/40">{stats.total} trains</span>
          <span className="text-emerald-400/60">{stats.onTime} a l'heure</span>
          <span className="text-amber-400/60">{stats.delayed} retardes</span>
          <span className="text-red-400/60">{stats.cancelled} supprimes</span>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-blue-300/40 uppercase tracking-wider">
                <th className="px-4 py-2">Ligne</th>
                <th className="px-4 py-2">N. Train</th>
                <th className="px-4 py-2">Destination / Provenance</th>
                <th className="px-4 py-2">Horaire</th>
                <th className="px-4 py-2">Prevu</th>
                <th className="px-4 py-2">Depart</th>
                <th className="px-4 py-2 text-center">Voie</th>
                <th className="px-4 py-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrains.slice(0, 50).map(train => (
                <TrainRow key={train.id} train={train} now={now} isNew={newIds.has(train.id)} />
              ))}
            </tbody>
          </table>
          {filteredTrains.length === 0 && (
            <div className="text-center py-16 text-blue-300/30">
              <p className="text-lg">Aucun train trouve</p>
              <p className="text-sm mt-2">Modifiez vos filtres pour voir les trains</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
