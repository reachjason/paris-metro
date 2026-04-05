export default function ItineraryCulturalPage() {
  const stops = [
    {
      name: 'Musee d\'Orsay',
      time: '09:30 — 12:00',
      transit: 'RER D from Gare du Nord → Chatelet, then Metro 12 → Solferino (25 min)',
      description: 'Housed in a breathtaking Beaux-Arts railway station, the Musee d\'Orsay holds the world\'s greatest collection of Impressionist art. Monet, Renoir, Degas, Van Gogh, Cezanne — all under one spectacular clock-faced roof. The building itself is as much a work of art as the collection.',
      tip: 'Go straight to the 5th floor for the Impressionists. The terrace behind the giant clock face offers stunning views of Sacre-Coeur.',
    },
    {
      name: 'Walk Along the Left Bank',
      time: '12:00 — 12:30',
      transit: 'Walk along the Seine',
      description: 'Stroll from the Musee d\'Orsay along the Left Bank, past the bouquinistes (secondhand booksellers) who have lined the quays since the 16th century. Cross the Pont des Arts for the classic view of the Ile de la Cite.',
      tip: 'Browse the bouquinistes for vintage posters and rare editions — they\'re a UNESCO-listed tradition.',
    },
    {
      name: 'Lunch at Les Deux Magots',
      time: '12:30 — 14:00',
      transit: '15 min walk through Saint-Germain',
      description: 'The legendary cafe where Sartre, de Beauvoir, Hemingway, and Picasso held court. Still one of the best people-watching spots in Paris. Order a croque-monsieur and a cafe creme in the footsteps of the existentialists.',
      tip: 'Sit on the terrace facing the church of Saint-Germain-des-Pres, the oldest church in Paris.',
    },
    {
      name: 'Centre Pompidou',
      time: '14:30 — 17:00',
      transit: 'Metro 4 from Saint-Germain-des-Pres → Chatelet, walk to Pompidou (15 min)',
      description: 'The inside-out building that revolutionized museum design. Europe\'s largest modern art collection spans Picasso, Kandinsky, Matisse, Duchamp, and contemporary installations. The architecture by Renzo Piano and Richard Rogers remains radical 50 years on.',
      tip: 'Take the escalator to the top floor for free panoramic views of Paris, even without a museum ticket. Check for temporary exhibitions — they\'re always world-class.',
    },
    {
      name: 'Le Marais Galleries',
      time: '17:00 — 18:30',
      transit: 'Walk from Pompidou into the Marais (5 min)',
      description: 'The Marais is Paris\'s contemporary gallery district. Wander through Rue de Turenne, Rue Debelleyme, and Rue Vieille du Temple to discover cutting-edge galleries like Perrotin, Thaddaeus Ropac, and dozens of smaller independent spaces.',
      tip: 'Most galleries are free. Thursday evenings many host vernissages (opening nights) with free wine.',
    },
    {
      name: 'Palais de Tokyo',
      time: '19:00 — 21:00',
      transit: 'Metro 1 from Saint-Paul → Alma-Marceau (20 min)',
      description: 'Paris\'s most experimental contemporary art space, open until midnight. Immersive installations, performance art, and provocative exhibitions in a raw concrete brutalist space. It\'s the opposite of a traditional museum — and that\'s the point.',
      tip: 'Open until midnight — one of the only evening museums in Paris. The bookshop and restaurant (Les Grands Verres) are excellent.',
    },
    {
      name: 'Dinner at Pink Mamma',
      time: '21:15 — 22:30',
      transit: 'Metro 9 from Alma-Marceau → Pigalle, then walk (25 min)',
      description: 'End your cultural day in a cultural phenomenon — this four-story Italian restaurant near Gare du Nord is a spectacle of food, design, and energy. Wood-fired pizzas, handmade pasta, and a rooftop terrace with Sacre-Coeur views.',
      tip: 'No reservations. Go at 21:00 when the queue is shorter. The truffle pizza is outstanding.',
    },
  ];

  return (
    <div className="px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Cultural Paris</h2>
        <p className="text-lg text-white/40 mb-2">Art from the Impressionists to the avant-garde</p>
        <p className="text-sm text-white/20 mb-10">Starting and ending near Gare du Nord. A day of world-class art and ideas.</p>

        <div className="relative">
          <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-transparent" />

          <div className="space-y-8">
            {stops.map((stop, i) => (
              <div key={i} className="relative pl-10 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-[#0d1f3c] border-2 border-violet-400 z-10" />

                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{stop.name}</h3>
                    <span className="text-xs font-mono text-violet-300/60 whitespace-nowrap ml-4">{stop.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-violet-400/60 font-semibold">Transit</span>
                    <span className="text-xs text-white/30">{stop.transit}</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-3">{stop.description}</p>
                  <div className="bg-violet-500/5 border border-violet-500/10 rounded-lg px-3 py-2">
                    <p className="text-xs text-violet-300/60"><span className="font-semibold text-violet-300/80">Tip:</span> {stop.tip}</p>
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
