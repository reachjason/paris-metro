import type { Restaurant, StationAccessibility } from './types';

export const STATION_INFO = {
  'gare-du-nord': {
    name: 'Gare du Nord',
    address: '18 Rue de Dunkerque, 75010 Paris',
    description: 'The busiest railway station in Europe by total passenger numbers, serving northern France, Belgium, Netherlands, Germany, and the UK via Eurostar.',
    lines: ['RER B', 'RER D', 'Transilien H', 'Transilien K', 'TGV', 'Eurostar', 'Thalys', 'Metro 4', 'Metro 5'],
    accessibility: {
      station: 'Gare du Nord',
      stairs: true,
      escalators: true,
      lifts: true,
      notes: 'Fully accessible. Lifts connect all levels including Eurostar terminal, mainline platforms, and Metro lines 4 & 5. Assistance available at the Accueil desk.',
    } as StationAccessibility,
  },
  'bir-hakeim': {
    name: 'Bir-Hakeim',
    address: 'Quai de Grenelle / Pont de Bir-Hakeim, 75015 Paris',
    description: 'An elevated Metro station on Line 6, famous for its iconic steel viaduct over the Seine and views of the Eiffel Tower. Featured in the film Inception.',
    lines: ['Metro 6'],
    accessibility: {
      station: 'Bir-Hakeim',
      stairs: true,
      escalators: true,
      lifts: false,
      notes: 'Elevated station with stairs and escalators. No lift access — not fully wheelchair accessible. The platform is on the viaduct level above street.',
    } as StationAccessibility,
  },
};

export const M6_STATIONS: StationAccessibility[] = [
  { station: 'Charles de Gaulle - Etoile', stairs: true, escalators: true, lifts: true, notes: 'Major interchange. Lifts available on some routes.' },
  { station: 'Kleber', stairs: true, escalators: false, lifts: false, notes: 'Stairs only. No step-free access.' },
  { station: 'Boissiere', stairs: true, escalators: false, lifts: false, notes: 'Stairs only. No step-free access.' },
  { station: 'Trocadero', stairs: true, escalators: true, lifts: false, notes: 'Escalators available. Interchange with Line 9.' },
  { station: 'Passy', stairs: true, escalators: false, lifts: false, notes: 'Elevated station. Stairs only.' },
  { station: 'Bir-Hakeim', stairs: true, escalators: true, lifts: false, notes: 'Elevated viaduct station. Escalators but no lift.' },
  { station: 'Dupleix', stairs: true, escalators: false, lifts: false, notes: 'Elevated station. Stairs only.' },
  { station: 'La Motte-Picquet - Grenelle', stairs: true, escalators: true, lifts: false, notes: 'Major interchange (Lines 6, 8, 10). Escalators on some exits.' },
  { station: 'Cambronne', stairs: true, escalators: false, lifts: false, notes: 'Stairs only.' },
  { station: 'Sevres - Lecourbe', stairs: true, escalators: false, lifts: false, notes: 'Stairs only.' },
  { station: 'Pasteur', stairs: true, escalators: true, lifts: false, notes: 'Interchange with Line 12. Escalators available.' },
  { station: 'Montparnasse - Bienvenue', stairs: true, escalators: true, lifts: true, notes: 'Major hub. Lift access available. Interchange with Lines 4, 12, 13.' },
  { station: 'Edgar Quinet', stairs: true, escalators: false, lifts: false, notes: 'Stairs only.' },
  { station: 'Raspail', stairs: true, escalators: false, lifts: false, notes: 'Interchange with Line 4. Stairs only.' },
  { station: 'Denfert-Rochereau', stairs: true, escalators: true, lifts: true, notes: 'Interchange with Line 4 and RER B. Lift access available.' },
  { station: 'Saint-Jacques', stairs: true, escalators: false, lifts: false, notes: 'Stairs only.' },
  { station: 'Glaciere', stairs: true, escalators: false, lifts: false, notes: 'Stairs only.' },
  { station: 'Corvisart', stairs: true, escalators: false, lifts: false, notes: 'Elevated station with stairs.' },
  { station: 'Place d\'Italie', stairs: true, escalators: true, lifts: true, notes: 'Major interchange (Lines 5, 7). Lift access available.' },
  { station: 'Nationale', stairs: true, escalators: false, lifts: false, notes: 'Stairs only.' },
  { station: 'Chevaleret', stairs: true, escalators: false, lifts: false, notes: 'Stairs only.' },
  { station: 'Quai de la Gare', stairs: true, escalators: true, lifts: false, notes: 'Elevated station. Escalators available.' },
  { station: 'Bercy', stairs: true, escalators: true, lifts: true, notes: 'Interchange with Line 14. Lift access available.' },
  { station: 'Dugommier', stairs: true, escalators: false, lifts: false, notes: 'Stairs only.' },
  { station: 'Daumesnil', stairs: true, escalators: true, lifts: false, notes: 'Interchange with Line 8. Escalators available.' },
  { station: 'Bel-Air', stairs: true, escalators: false, lifts: false, notes: 'Elevated station. Stairs only.' },
  { station: 'Picpus', stairs: true, escalators: false, lifts: false, notes: 'Stairs only.' },
  { station: 'Nation', stairs: true, escalators: true, lifts: true, notes: 'Major interchange (Lines 1, 2, 9, RER A). Lift access available.' },
];

export const RESTAURANTS_GARE_DU_NORD: Restaurant[] = [
  { name: 'Terminus Nord', cuisine: 'French Brasserie', price: '€€€', distance: '1 min', rating: 4.2, address: '23 Rue de Dunkerque' },
  { name: 'Chez Michel', cuisine: 'Breton / French', price: '€€', distance: '4 min', rating: 4.5, address: '10 Rue de Belzunce' },
  { name: 'Abri', cuisine: 'Japanese-French Fusion', price: '€€', distance: '5 min', rating: 4.6, address: '92 Rue du Faubourg-Poissonniere' },
  { name: 'Hotel du Nord', cuisine: 'French Bistro', price: '€€', distance: '8 min', rating: 4.3, address: '102 Quai de Jemmapes' },
  { name: 'Pink Mamma', cuisine: 'Italian', price: '€€', distance: '12 min', rating: 4.4, address: '20bis Rue de Douai' },
  { name: 'Le Bouillon Chartier', cuisine: 'Traditional French', price: '€', distance: '10 min', rating: 4.3, address: '7 Rue du Faubourg Montmartre' },
  { name: 'Mamagoto', cuisine: 'Asian Street Food', price: '€', distance: '6 min', rating: 4.1, address: '5 Rue des Petits Hotels' },
  { name: 'Cafe Panique', cuisine: 'Modern French', price: '€€€', distance: '5 min', rating: 4.4, address: '12 Rue des Messageries' },
];

export const RESTAURANTS_BIR_HAKEIM: Restaurant[] = [
  { name: 'Le Petit Cler', cuisine: 'French Bistro', price: '€€', distance: '8 min', rating: 4.4, address: '29 Rue Cler' },
  { name: 'Cafe Constant', cuisine: 'French Brasserie', price: '€€', distance: '10 min', rating: 4.3, address: '139 Rue Saint-Dominique' },
  { name: 'Les Cocottes', cuisine: 'Modern French', price: '€€', distance: '10 min', rating: 4.2, address: '135 Rue Saint-Dominique' },
  { name: 'Il Ristorante', cuisine: 'Italian', price: '€€', distance: '3 min', rating: 4.0, address: '19 Quai de Grenelle' },
  { name: 'Le Troquet', cuisine: 'Basque / French', price: '€€€', distance: '12 min', rating: 4.5, address: '21 Rue Francois Bonvin' },
  { name: 'Tomy & Co', cuisine: 'Contemporary French', price: '€€€', distance: '12 min', rating: 4.6, address: '22 Rue Surcouf' },
];

export const LINE_CLOSING_TIMES: Record<string, { lastTrain: string; firstTrain: string; notes: string }> = {
  'RER B': { lastTrain: '00:15', firstTrain: '04:50', notes: 'Last train ~00:15 from Gare du Nord. Reduced frequency after 22:00.' },
  'RER D': { lastTrain: '00:20', firstTrain: '04:55', notes: 'Last departure ~00:20. Night service not available.' },
  'Transilien H': { lastTrain: '00:30', firstTrain: '05:15', notes: 'Last train ~00:30 to Luzarches. Check specific destination.' },
  'Transilien K': { lastTrain: '23:45', firstTrain: '05:30', notes: 'Ends earlier than other lines. Last train ~23:45.' },
  'Metro 4': { lastTrain: '01:15', firstTrain: '05:30', notes: 'Last train ~01:15 (01:45 Fri-Sat). Runs every 8 min after 22:00.' },
  'Metro 5': { lastTrain: '01:15', firstTrain: '05:30', notes: 'Last train ~01:15 (01:45 Fri-Sat).' },
  'Metro 6': { lastTrain: '01:15', firstTrain: '05:30', notes: 'Last train from Bir-Hakeim ~01:05. Extended to 02:15 on Fri-Sat nights.' },
  'TGV': { lastTrain: '22:30', firstTrain: '06:00', notes: 'Last TGV departures around 21:00-22:30 depending on destination.' },
  'Eurostar': { lastTrain: '21:01', firstTrain: '05:40', notes: 'Last Eurostar to London departs 21:01. Check-in closes 30 min before departure.' },
  'Thalys': { lastTrain: '20:25', firstTrain: '06:25', notes: 'Last Thalys to Brussels ~20:25. Now branded as Eurostar Red.' },
};

export const BEST_DESTINATIONS = [
  {
    name: 'Chantilly',
    from: 'Gare du Nord',
    line: 'RER D / Transilien H',
    travelTime: '25 min',
    description: 'Stunning chateau with world-class art collection, gorgeous gardens by Le Notre, and the famous Chantilly cream. The Grandes Ecuries (horse museum) are spectacular.',
  },
  {
    name: 'Eiffel Tower & Trocadero',
    from: 'Bir-Hakeim (Metro 6)',
    line: 'Metro 6',
    travelTime: '0 min (walk)',
    description: 'Bir-Hakeim is the closest Metro to the Eiffel Tower. Walk across the Pont de Bir-Hakeim for the most cinematic approach, or ride one stop to Trocadero for the classic photo.',
  },
  {
    name: 'Brussels',
    from: 'Gare du Nord',
    line: 'Eurostar / Thalys',
    travelTime: '1h22',
    description: 'The Grand Place, Belgian waffles, chocolate shops, Art Nouveau architecture, and the Magritte Museum. An easy day trip or weekend getaway.',
  },
];
