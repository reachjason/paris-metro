import type { Train } from '../data/types';
import { TRAIN_COLORS } from '../data/types';
import { StatusBadge } from './StatusBadge';
import { CrowdBadge } from './CrowdBadge';

function formatTime(date: Date): string {
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function timeUntil(date: Date, now: Date): string {
  const diffMs = date.getTime() - now.getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 0) return '';
  if (diffMin === 0) return 'now';
  if (diffMin < 60) return `${diffMin}m`;
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return `${h}h${m.toString().padStart(2, '0')}`;
}

export function TrainRow({ train, now, isNew }: { train: Train; now: Date; isNew: boolean }) {
  const color = TRAIN_COLORS[train.type];
  const isCancelled = train.status === 'cancelled';
  const countdown = timeUntil(train.expectedTime, now);

  return (
    <tr className={`border-b border-white/5 hover:bg-white/[0.03] transition-colors ${isNew ? 'animate-flip-in' : ''} ${isCancelled ? 'opacity-40' : ''}`}>
      <td className="px-4 py-3">
        <span
          className="inline-block px-2.5 py-1 rounded-md text-xs font-black tracking-wide text-white"
          style={{ backgroundColor: color }}
        >
          {train.type}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="font-mono text-sm text-blue-200/70">{train.trainNumber}</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold ${train.direction === 'departure' ? 'text-sky-400' : 'text-violet-400'}`}>
            {train.direction === 'departure' ? 'DEP' : 'ARR'}
          </span>
          <span className={`text-sm font-semibold text-white ${isCancelled ? 'line-through' : ''}`}>
            {train.direction === 'departure' ? train.destination : train.origin}
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={`font-mono text-sm ${isCancelled ? 'line-through text-white/20' : 'text-white/60'}`}>
          {formatTime(train.scheduledTime)}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`font-mono text-sm font-bold ${
          train.status === 'delayed' ? 'text-amber-400' :
          train.status === 'cancelled' ? 'text-red-400/50' : 'text-emerald-400'
        }`}>
          {isCancelled ? '---' : formatTime(train.expectedTime)}
        </span>
      </td>
      <td className="px-4 py-3">
        {countdown && !isCancelled && (
          <span className="font-mono text-xs text-sky-300/80 bg-sky-500/10 px-2 py-0.5 rounded">
            {countdown}
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-center">
        <span className="flap-cell inline-block px-3 py-1 rounded text-sky-200 font-mono font-bold text-sm min-w-[3rem]">
          {isCancelled ? '--' : train.platform}
        </span>
      </td>
      <td className="px-4 py-3">
        <CrowdBadge level={train.crowdLevel} />
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={train.status} delayMinutes={train.delayMinutes} />
      </td>
    </tr>
  );
}
