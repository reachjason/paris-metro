export default function ItineraryFoodPage() {
  const stops = [
    {
      name: 'Breakfast at Du Pain et des Idees',
      time: '08:30 — 09:15',
      transit: '12 min walk from Gare du Nord along Canal Saint-Martin',
      description: 'One of Paris\'s finest bakeries, in a stunning 19th-century shopfront on Rue Yves Toudic. The pain des amis (sourdough), escargot pistache-chocolat, and sacristain are legendary. Baker Christophe Vasseur revived forgotten recipes to create something truly special.',
      tip: 'Arrive by 08:30 — the escargots sell out fast. Cash is preferred. Closed Saturday and Sunday.',
    },
    {
      name: 'Marche d\'Aligre',
      time: '09:45 — 11:00',
      transit: 'Metro 5 from Jacques Bonsergent → Bastille, then walk (20 min total)',
      description: 'The most authentic Parisian market, far from tourist crowds. An open-air market with incredible produce, a covered hall (Marche Beauvau) with exceptional cheesemongers, charcuterie, and fishmongers, plus a flea market alongside. This is where Parisian chefs shop.',
      tip: 'Try the aged Comte from the fromagerie in the covered hall. Pick up olives and fresh bread for a Seine-side picnic later.',
    },
    {
      name: 'Lunch at Le Bouillon Chartier',
      time: '11:30 — 13:00',
      transit: 'Metro 8 from Ledru-Rollin → Grands Boulevards (15 min)',
      description: 'An 1896 workers\' canteen with original Belle Epoque interiors — brass luggage racks, mirrored walls, waiters in black waistcoats scribbling orders on the paper tablecloths. Classic French food (terrine, duck confit, tarte tatin) at prices that haven\'t kept up with inflation. A Paris institution.',
      tip: 'Order the oeuf mayo (a national competition winner), the poireaux vinaigrette, and the profiteroles. The whole meal costs less than a cocktail in Saint-Germain.',
    },
    {
      name: 'Rue Montorgueil Food Street',
      time: '13:30 — 15:00',
      transit: 'Walk from Grands Boulevards (10 min)',
      description: 'A pedestrian street lined with Paris\'s best food shops. Stohrer (the oldest patisserie in Paris, since 1730), fishmongers, Italian delis, wine shops, and fromageries. Graze your way through — this is food tourism at its most delicious.',
      tip: 'Try the rum baba at Stohrer (they invented it). Get an espresso at Cafe Compagnon. The cheese shop La Fermette has incredible seasonal selections.',
    },
    {
      name: 'Afternoon Wine at Le Baron Rouge',
      time: '15:30 — 16:30',
      transit: 'Metro 4 from Les Halles → Bastille, walk to Rue Theophile Roussel (20 min)',
      description: 'The most beloved wine bar in Paris, right next to Marche d\'Aligre. Barrels line the walls, oysters are shucked on the pavement, and the natural wine selection is superb. Locals crowd the sidewalk with glasses of Beaujolais and plates of saucisson.',
      tip: 'Order oysters if it\'s the weekend. Ask for a glass of whatever\'s just been opened — the staff know their wines. Stand outside like a local.',
    },
    {
      name: 'Patisserie Crawl in the 6th',
      time: '17:00 — 18:30',
      transit: 'Metro 1 from Bastille → Saint-Paul, Metro 1 to Chatelet, then Metro 4 to Saint-Germain (20 min)',
      description: 'Saint-Germain is patisserie heaven. Visit Pierre Herme (the Picasso of pastry — try the Ispahan macaron), then Sadaharu Aoki (Japanese-French fusion pastry), then Gerard Mulot for a classic tarte aux fruits. Three blocks, three masters, three completely different approaches to sugar and butter.',
      tip: 'Pierre Herme\'s macarons are worth the queue. Buy a box to take home — they survive 48 hours perfectly.',
    },
    {
      name: 'Dinner at Abri',
      time: '19:30 — 21:30',
      transit: 'Metro 4 from Saint-Germain → Gare du Nord, walk to Rue du Faubourg-Poissonniere (20 min)',
      description: 'A tiny 20-seat restaurant near Gare du Nord where Japanese chef Katsuaki Okiyama crafts exquisite French-Japanese tasting menus from market ingredients. The omakase-style approach means you trust the chef — and you should. One of the best meals in Paris at a fraction of starred restaurant prices.',
      tip: 'Book well ahead — only 20 seats. The lunch menu is an exceptional deal. BYOB-friendly with a small corkage fee.',
    },
    {
      name: 'Nightcap at Le Syndicat',
      time: '22:00 — 23:00',
      transit: '8 min walk from Abri',
      description: 'End your food day with innovative cocktails at this speakeasy-style bar that uses only French spirits. Behind a graffitied facade lies one of the world\'s 50 best bars. Creative drinks using Cognac, Armagnac, Calvados, and French liqueurs you\'ve never heard of.',
      tip: 'Ring the doorbell. Try whatever the bartender recommends — they\'re artists. Close to Gare du Nord for the walk back.',
    },
  ];

  return (
    <div className="px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Food-Driven Paris</h2>
        <p className="text-lg text-white/40 mb-2">Eat your way through the city of gastronomy</p>
        <p className="text-sm text-white/20 mb-10">Starting and ending near Gare du Nord. From legendary bakeries to hidden wine bars.</p>

        <div className="relative">
          <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-transparent" />

          <div className="space-y-8">
            {stops.map((stop, i) => (
              <div key={i} className="relative pl-10 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-[#0d1f3c] border-2 border-amber-400 z-10" />

                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{stop.name}</h3>
                    <span className="text-xs font-mono text-amber-300/60 whitespace-nowrap ml-4">{stop.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-amber-400/60 font-semibold">Transit</span>
                    <span className="text-xs text-white/30">{stop.transit}</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-3">{stop.description}</p>
                  <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2">
                    <p className="text-xs text-amber-300/60"><span className="font-semibold text-amber-300/80">Tip:</span> {stop.tip}</p>
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
