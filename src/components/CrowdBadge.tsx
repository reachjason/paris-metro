import type { CrowdLevel } from '../data/types';

const CROWD_CONFIG: Record<CrowdLevel, { label: string; color: string; bars: number }> = {
  low: { label: 'Quiet', color: 'text-emerald-400', bars: 1 },
  medium: { label: 'Moderate', color: 'text-amber-400', bars: 2 },
  high: { label: 'Busy', color: 'text-red-400', bars: 3 },
};

export function CrowdBadge({ level }: { level: CrowdLevel }) {
  const config = CROWD_CONFIG[level];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${config.color}`}>
      <span className="flex items-end gap-0.5 h-3">
        {[1, 2, 3].map(i => (
          <span
            key={i}
            className={`w-1 rounded-full transition-all ${i <= config.bars ? 'bg-current' : 'bg-slate-700'}`}
            style={{ height: `${i * 33}%` }}
          />
        ))}
      </span>
      {config.label}
    </span>
  );
}
