import type { TrainStatus } from '../data/types';

const STATUS_CONFIG: Record<TrainStatus, { label: string; bg: string; text: string; dot: string }> = {
  'on-time': { label: 'On Time', bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  'delayed': { label: 'Delayed', bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400' },
  'cancelled': { label: 'Cancelled', bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-400' },
};

export function StatusBadge({ status, delayMinutes }: { status: TrainStatus; delayMinutes: number }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${status === 'on-time' ? 'animate-pulse-dot' : ''}`} />
      {config.label}
      {status === 'delayed' && <span className="opacity-70">+{delayMinutes}m</span>}
    </span>
  );
}
