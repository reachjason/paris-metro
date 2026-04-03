import type { TrainType, TrainStatus, Direction } from '../data/types';
import { TRAIN_COLORS } from '../data/types';

interface FilterBarProps {
  selectedTypes: Set<TrainType>;
  toggleType: (type: TrainType) => void;
  selectedStatus: TrainStatus | 'all';
  setSelectedStatus: (status: TrainStatus | 'all') => void;
  direction: Direction | 'all';
  setDirection: (dir: Direction | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const ALL_TYPES: TrainType[] = ['RER B', 'RER D', 'Transilien H', 'Transilien K', 'TGV', 'Eurostar', 'Thalys'];

export function FilterBar({
  selectedTypes, toggleType,
  selectedStatus, setSelectedStatus,
  direction, setDirection,
  searchQuery, setSearchQuery,
}: FilterBarProps) {
  return (
    <div className="bg-[#0d0d22] border-b border-blue-900/20 px-6 py-4">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Train type pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-blue-300/40 uppercase tracking-wider mr-2">Lignes</span>
          {ALL_TYPES.map(type => {
            const active = selectedTypes.has(type);
            const color = TRAIN_COLORS[type];
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border"
                style={{
                  backgroundColor: active ? color + '20' : 'transparent',
                  borderColor: active ? color : '#1e293b',
                  color: active ? color : '#64748b',
                }}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Second row: direction, status, search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-lg overflow-hidden border border-blue-900/30">
            {([['all', 'Tous'], ['departure', 'Departs'], ['arrival', 'Arrivees']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setDirection(val)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  direction === val ? 'bg-blue-600 text-white' : 'text-blue-300/50 hover:text-blue-300/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex rounded-lg overflow-hidden border border-blue-900/30">
            {([['all', 'Tous'], ['on-time', 'A l\'heure'], ['delayed', 'Retarde'], ['cancelled', 'Supprime']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setSelectedStatus(val)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  selectedStatus === val ? 'bg-blue-600 text-white' : 'text-blue-300/50 hover:text-blue-300/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Rechercher une destination..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 min-w-[200px] bg-[#12122a] border border-blue-900/30 rounded-lg px-3 py-1.5 text-sm text-blue-100 placeholder-blue-300/30 outline-none focus:border-blue-500/50"
          />
        </div>
      </div>
    </div>
  );
}
