export default function ItineraryHistoricPage() {
  const stops = [
    {
      name: 'Notre-Dame de Paris',
      time: '09:00 — 10:30',
      transit: 'Metro 4 from Gare du Nord → Cite (direct, 8 min)',
      description: 'Start your day at the iconic cathedral on the Ile de la Cite. Though still under restoration after the 2019 fire, the exterior and surrounding area are magnificent. Walk along the Seine and explore the medieval streets of the island.',
      tip: 'Arrive early to avoid crowds. The archaeological crypt beneath the square is a hidden gem.',
    },
    {
      name: 'Sainte-Chapelle',
      time: '10:45 — 11:45',
      transit: '5 min walk from Notre-Dame',
      description: 'Just steps from Notre-Dame, this 13th-century Gothic chapel has the most stunning stained glass windows in Paris. Built by Louis IX to house the Crown of Thorns, it\'s a masterpiece of Rayonnant Gothic architecture.',
      tip: 'Buy tickets online to skip the queue. The upper chapel is the showstopper.',
    },
    {
      name: 'Conciergerie',
      time: '11:45 — 12:30',
      transit: 'Same building complex as Sainte-Chapelle',
      description: 'The former royal palace turned revolutionary prison where Marie Antoinette was held before her execution. The Gothic halls and recreated prison cells are haunting and fascinating.',
      tip: 'Get the combined ticket with Sainte-Chapelle for a discount.',
    },
    {
      name: 'Lunch at Bouillon Chartier',
      time: '12:45 — 14:00',
      transit: 'Metro 4 Cite → Grands Boulevards (15 min)',
      description: 'A historic Parisian institution since 1896. This grand belle epoque dining hall serves classic French cuisine at remarkably affordable prices. The original decor, brass luggage racks, and bustling atmosphere are pure old Paris.',
      tip: 'No reservations — queue early. Try the oeuf mayo and roast chicken.',
    },
    {
      name: 'Musee Carnavalet',
      time: '14:30 — 16:30',
      transit: 'Metro 8 from Grands Boulevards → Chemin Vert (10 min)',
      description: 'The museum of the history of Paris, housed in two stunning Renaissance mansions in the Marais. From prehistoric Paris through the Revolution to modern times. Recently renovated with brilliant new exhibitions.',
      tip: 'Free entry! Don\'t miss the Art Nouveau rooms and the Revolution galleries.',
    },
    {
      name: 'Le Marais Walk',
      time: '16:30 — 18:00',
      transit: 'Walk from the museum',
      description: 'Wander through the historic Marais district. Place des Vosges (Paris\'s oldest planned square, built in 1612), the medieval Rue des Rosiers, and the grand Hotel de Sully. Layers of history from medieval to 17th century.',
      tip: 'Stop at Place des Vosges to rest under the arcades. Visit Maison de Victor Hugo (free).',
    },
    {
      name: 'Pantheon',
      time: '18:15 — 19:15',
      transit: 'Metro 1 St-Paul → Chatelet, then RER B to Luxembourg (20 min)',
      description: 'The neoclassical temple where France honors its greatest citizens. Voltaire, Rousseau, Victor Hugo, Marie Curie, and Alexandre Dumas rest in the crypt. Foucault\'s original pendulum hangs in the nave.',
      tip: 'Evening light through the dome is spectacular. Check for the Foucault pendulum demonstration times.',
    },
    {
      name: 'Dinner at Chez Michel',
      time: '19:30 — 21:00',
      transit: 'RER B Luxembourg → Gare du Nord (10 min)',
      description: 'End your historic day back near Gare du Nord at this beloved Breton-French restaurant. Chef Thierry Breton serves generous prix fixe menus with Brittany-inspired dishes in a warm, convivial setting.',
      tip: 'Book ahead. The Paris-Brest dessert is legendary.',
    },
  ];

  return (
    <div className="px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Historic Paris</h2>
        <p className="text-lg text-white/40 mb-2">A day through 2,000 years of Parisian history</p>
        <p className="text-sm text-white/20 mb-10">Starting and ending at Gare du Nord. All transit via Metro and RER.</p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-sky-500/40 via-sky-500/20 to-transparent" />

          <div className="space-y-8">
            {stops.map((stop, i) => (
              <div key={i} className="relative pl-10 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-[#0d1f3c] border-2 border-sky-400 z-10" />

                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{stop.name}</h3>
                    <span className="text-xs font-mono text-sky-300/60 whitespace-nowrap ml-4">{stop.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-sky-400/60 font-semibold">Transit</span>
                    <span className="text-xs text-white/30">{stop.transit}</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-3">{stop.description}</p>
                  <div className="bg-sky-500/5 border border-sky-500/10 rounded-lg px-3 py-2">
                    <p className="text-xs text-sky-300/60"><span className="font-semibold text-sky-300/80">Tip:</span> {stop.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
