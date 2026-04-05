import type { TrainType, TrainStatus, Direction } from '../data/types';
import { TRAIN_COLORS } from '../data/types';

interface FilterBarProps {
  trainTypes: TrainType[];
  selectedTypes: Set<TrainType>;
  toggleType: (type: TrainType) => void;
  selectedStatus: TrainStatus | 'all';
  setSelectedStatus: (status: TrainStatus | 'all') => void;
  direction: Direction | 'all';
  setDirection: (dir: Direction | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export function FilterBar({
  trainTypes,
  selectedTypes, toggleType,
  selectedStatus, setSelectedStatus,
  direction, setDirection,
  searchQuery, setSearchQuery,
}: FilterBarProps) {
  return (
    <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mr-2">Lines</span>
          {trainTypes.map(type => {
            const active = selectedTypes.has(type);
            const color = TRAIN_COLORS[type];
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer"
                style={{
                  backgroundColor: active ? color + '18' : 'transparent',
                  borderColor: active ? color + '60' : 'rgba(255,255,255,0.08)',
                  color: active ? color : 'rgba(255,255,255,0.3)',
                }}
              >
                {type}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            {([['all', 'All'], ['departure', 'Departures'], ['arrival', 'Arrivals']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setDirection(val)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  direction === val ? 'bg-sky-500 text-white' : 'text-white/30 hover:text-white/60'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex rounded-lg overflow-hidden border border-white/10">
            {([['all', 'All'], ['on-time', 'On Time'], ['delayed', 'Delayed'], ['cancelled', 'Cancelled']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setSelectedStatus(val)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  selectedStatus === val ? 'bg-sky-500 text-white' : 'text-white/30 hover:text-white/60'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search destination..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 min-w-[200px] bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-white/20 outline-none focus:border-sky-500/50 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
