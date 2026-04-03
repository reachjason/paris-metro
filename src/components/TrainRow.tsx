import type { Train } from '../data/types';
import { TRAIN_COLORS } from '../data/types';
import { StatusBadge } from './StatusBadge';

function formatTime(date: Date): string {
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function timeUntil(date: Date, now: Date): string {
  const diffMs = date.getTime() - now.getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 0) return '';
  if (diffMin === 0) return 'imminent';
  if (diffMin < 60) return `${diffMin} min`;
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return `${h}h${m.toString().padStart(2, '0')}`;
}

export function TrainRow({ train, now, isNew }: { train: Train; now: Date; isNew: boolean }) {
  const color = TRAIN_COLORS[train.type];
  const isCancelled = train.status === 'cancelled';
  const countdown = timeUntil(train.expectedTime, now);

  return (
    <tr className={`border-b border-blue-900/10 hover:bg-blue-900/10 transition-colors ${isNew ? 'animate-flip-in' : ''} ${isCancelled ? 'opacity-50' : ''}`}>
      {/* Type badge */}
      <td className="px-4 py-3">
        <span
          className="inline-block px-2.5 py-1 rounded-md text-xs font-black tracking-wide text-white"
          style={{ backgroundColor: color }}
        >
          {train.type}
        </span>
      </td>

      {/* Train number */}
      <td className="px-4 py-3">
        <span className="font-mono text-sm text-blue-200/80">{train.trainNumber}</span>
      </td>

      {/* Direction icon + destination/origin */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs ${train.direction === 'departure' ? 'text-blue-400' : 'text-purple-400'}`}>
            {train.direction === 'departure' ? '>>>' : '<<<'}
          </span>
          <span className={`text-sm font-semibold text-white ${isCancelled ? 'line-through' : ''}`}>
            {train.direction === 'departure' ? train.destination : train.origin}
          </span>
        </div>
      </td>

      {/* Scheduled time */}
      <td className="px-4 py-3">
        <span className={`font-mono text-sm ${isCancelled ? 'line-through text-blue-300/30' : 'text-blue-200/70'}`}>
          {formatTime(train.scheduledTime)}
        </span>
      </td>

      {/* Expected time */}
      <td className="px-4 py-3">
        <span className={`font-mono text-sm font-bold ${
          train.status === 'delayed' ? 'text-amber-400' :
          train.status === 'cancelled' ? 'text-red-400/50' :
          'text-emerald-400'
        }`}>
          {isCancelled ? '---' : formatTime(train.expectedTime)}
        </span>
      </td>

      {/* Countdown */}
      <td className="px-4 py-3">
        {countdown && !isCancelled && (
          <span className="font-mono text-xs text-amber-300/70 bg-amber-900/20 px-2 py-0.5 rounded">
            {countdown}
          </span>
        )}
      </td>

      {/* Platform */}
      <td className="px-4 py-3 text-center">
        <span className="flap-cell inline-block px-3 py-1 rounded text-amber-300 font-mono font-bold text-sm min-w-[3rem]">
          {isCancelled ? '--' : train.platform}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <StatusBadge status={train.status} delayMinutes={train.delayMinutes} />
      </td>
    </tr>
  );
}
