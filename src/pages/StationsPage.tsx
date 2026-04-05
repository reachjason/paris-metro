import { STATION_INFO, M6_STATIONS, RESTAURANTS_GARE_DU_NORD, RESTAURANTS_BIR_HAKEIM, BEST_DESTINATIONS } from '../data/stationData';
import type { StationAccessibility, Restaurant } from '../data/types';

function AccessIcon({ available }: { available: boolean }) {
  return available
    ? <span className="text-emerald-400 text-xs font-bold">Yes</span>
    : <span className="text-white/20 text-xs">No</span>;
}

function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 hover:bg-white/[0.05] transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-bold text-white">{r.name}</h4>
        <span className="text-xs text-sky-300/60 font-mono">{r.distance}</span>
      </div>
      <p className="text-xs text-white/40 mb-2">{r.cuisine} · {r.price}</p>
      <div className="flex items-center gap-2">
        <span className="text-xs text-amber-400">{'★'.repeat(Math.round(r.rating))}{'☆'.repeat(5 - Math.round(r.rating))}</span>
        <span className="text-[11px] text-white/25">{r.rating}</span>
      </div>
      <p className="text-[11px] text-white/20 mt-1">{r.address}</p>
    </div>
  );
}

function AccessibilityRow({ s }: { s: StationAccessibility }) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
      <td className="px-4 py-2.5 text-sm text-white font-medium">{s.station}</td>
      <td className="px-4 py-2.5 text-center"><AccessIcon available={s.stairs} /></td>
      <td className="px-4 py-2.5 text-center"><AccessIcon available={s.escalators} /></td>
      <td className="px-4 py-2.5 text-center"><AccessIcon available={s.lifts} /></td>
      <td className="px-4 py-2.5 text-xs text-white/30">{s.notes}</td>
    </tr>
  );
}

export default function StationsPage() {
  const gdn = STATION_INFO['gare-du-nord'];
  const bh = STATION_INFO['bir-hakeim'];

  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Gare du Nord */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-1">Gare du Nord</h2>
          <p className="text-sm text-white/30 mb-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            {gdn.address}
          </p>
          <p className="text-sm text-white/40 mb-6 max-w-2xl">{gdn.description}</p>

          {/* Accessibility */}
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 mb-6">
            <h3 className="text-lg font-bold text-white mb-3">Accessibility</h3>
            <div className="grid grid-cols-3 gap-6 mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/25 mb-1">Stairs</div>
                <AccessIcon available={gdn.accessibility.stairs} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/25 mb-1">Escalators</div>
                <AccessIcon available={gdn.accessibility.escalators} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/25 mb-1">Lifts</div>
                <AccessIcon available={gdn.accessibility.lifts} />
              </div>
            </div>
            <p className="text-xs text-white/30">{gdn.accessibility.notes}</p>
          </div>

          {/* Restaurants */}
          <h3 className="text-lg font-bold text-white mb-3">Eat Near Gare du Nord</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {RESTAURANTS_GARE_DU_NORD.map(r => <RestaurantCard key={r.name} r={r} />)}
          </div>
        </section>

        {/* Bir-Hakeim */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-1">Bir-Hakeim</h2>
          <p className="text-sm text-white/30 mb-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            {bh.address}
          </p>
          <p className="text-sm text-white/40 mb-6 max-w-2xl">{bh.description}</p>

          {/* Accessibility */}
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 mb-6">
            <h3 className="text-lg font-bold text-white mb-3">Accessibility</h3>
            <div className="grid grid-cols-3 gap-6 mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/25 mb-1">Stairs</div>
                <AccessIcon available={bh.accessibility.stairs} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/25 mb-1">Escalators</div>
                <AccessIcon available={bh.accessibility.escalators} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/25 mb-1">Lifts</div>
                <AccessIcon available={bh.accessibility.lifts} />
              </div>
            </div>
            <p className="text-xs text-white/30">{bh.accessibility.notes}</p>
          </div>

          {/* Restaurants */}
          <h3 className="text-lg font-bold text-white mb-3">Eat Near Bir-Hakeim</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESTAURANTS_BIR_HAKEIM.map(r => <RestaurantCard key={r.name} r={r} />)}
          </div>
        </section>

        {/* M6 Line Accessibility */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-1">Metro Line 6 — All Stations</h2>
          <p className="text-sm text-white/30 mb-6">Accessibility at every station on the M6 line (Charles de Gaulle - Etoile ↔ Nation)</p>
          <div className="overflow-auto bg-white/[0.02] border border-white/5 rounded-xl">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] text-white/25 uppercase tracking-widest font-semibold border-b border-white/5">
                  <th className="px-4 py-3">Station</th>
                  <th className="px-4 py-3 text-center">Stairs</th>
                  <th className="px-4 py-3 text-center">Escalators</th>
                  <th className="px-4 py-3 text-center">Lifts</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {M6_STATIONS.map(s => <AccessibilityRow key={s.station} s={s} />)}
              </tbody>
            </table>
          </div>
        </section>

        {/* Best destinations */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-1">Top 3 Destinations</h2>
          <p className="text-sm text-white/30 mb-6">The best places to visit from Gare du Nord and Bir-Hakeim</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BEST_DESTINATIONS.map(d => (
              <div key={d.name} className="bg-gradient-to-br from-sky-500/5 to-blue-600/5 border border-white/5 rounded-xl p-5">
                <h4 className="text-lg font-bold text-white mb-1">{d.name}</h4>
                <div className="flex flex-wrap gap-2 text-xs mb-3">
                  <span className="bg-white/5 px-2 py-0.5 rounded text-sky-300/70">{d.line}</span>
                  <span className="bg-white/5 px-2 py-0.5 rounded text-white/40">{d.travelTime}</span>
                  <span className="bg-white/5 px-2 py-0.5 rounded text-white/30">from {d.from}</span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
