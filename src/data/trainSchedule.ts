import type { Train, TrainType, TrainStatus, Direction, CrowdLevel } from './types';

const DESTINATIONS: Record<TrainType, string[]> = {
  'RER B': ['Aeroport CDG T2', 'Mitry-Claye', 'Aulnay-sous-Bois', 'Robinson', 'Saint-Remy-les-Chevreuse', 'Massy-Palaiseau'],
  'RER D': ['Orry-la-Ville', 'Creil', 'Villiers-le-Bel', 'Melun', 'Corbeil-Essonnes', 'Juvisy'],
  'Transilien H': ['Luzarches', 'Persan-Beaumont', 'Pontoise', 'Valmondois'],
  'Transilien K': ['Crepy-en-Valois', 'Mitry-Claye', 'Dammartin'],
  'TGV': ['Lille Europe', 'Lyon Part-Dieu', 'Marseille St-Charles', 'Bordeaux St-Jean', 'Strasbourg', 'Rennes', 'Nantes', 'Dunkerque', 'Valenciennes', 'Arras'],
  'Eurostar': ['London St Pancras', 'Brussels Midi', 'Amsterdam Centraal'],
  'Thalys': ['Brussels Midi', 'Amsterdam Centraal', 'Cologne Hbf', 'Dusseldorf Hbf'],
  'Metro 4': ['Porte de Clignancourt', 'Mairie de Montrouge', 'Bagneux'],
  'Metro 5': ['Bobigny - Pablo Picasso', 'Place d\'Italie'],
  'Metro 6': ['Charles de Gaulle - Etoile', 'Nation'],
};

const ORIGINS: Record<TrainType, string[]> = {
  'RER B': ['Aeroport CDG T2', 'Mitry-Claye', 'Robinson', 'Saint-Remy-les-Chevreuse'],
  'RER D': ['Orry-la-Ville', 'Creil', 'Melun', 'Corbeil-Essonnes'],
  'Transilien H': ['Luzarches', 'Persan-Beaumont', 'Pontoise'],
  'Transilien K': ['Crepy-en-Valois', 'Mitry-Claye'],
  'TGV': ['Lille Europe', 'Lyon Part-Dieu', 'Marseille St-Charles', 'Bordeaux St-Jean', 'Strasbourg', 'Rennes', 'Dunkerque', 'Arras'],
  'Eurostar': ['London St Pancras', 'Brussels Midi', 'Amsterdam Centraal'],
  'Thalys': ['Brussels Midi', 'Amsterdam Centraal', 'Cologne Hbf'],
  'Metro 4': ['Porte de Clignancourt', 'Mairie de Montrouge', 'Bagneux'],
  'Metro 5': ['Bobigny - Pablo Picasso', 'Place d\'Italie'],
  'Metro 6': ['Charles de Gaulle - Etoile', 'Nation'],
};

const FREQUENCY: Record<TrainType, number> = {
  'RER B': 4,
  'RER D': 5,
  'Transilien H': 15,
  'Transilien K': 20,
  'TGV': 12,
  'Eurostar': 60,
  'Thalys': 45,
  'Metro 4': 3,
  'Metro 5': 3,
  'Metro 6': 4,
};

const PLATFORMS: Record<TrainType, string[]> = {
  'RER B': ['B1', 'B2', 'B3'],
  'RER D': ['D1', 'D2'],
  'Transilien H': ['3', '4', '5', '6'],
  'Transilien K': ['7', '8'],
  'TGV': ['9', '11', '13', '15', '17', '19'],
  'Eurostar': ['2', '4', '6'],
  'Thalys': ['21', '23', '25'],
  'Metro 4': ['—'],
  'Metro 5': ['—'],
  'Metro 6': ['—'],
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function generateTrainNumber(type: TrainType, rand: () => number): string {
  const n = Math.floor(rand() * 9000) + 1000;
  switch (type) {
    case 'RER B': return `BFOR${n}`;
    case 'RER D': return `DFOR${n}`;
    case 'Transilien H': return `H${n}`;
    case 'Transilien K': return `K${n}`;
    case 'TGV': return `${n}`;
    case 'Eurostar': return `ES${Math.floor(rand() * 900) + 9000}`;
    case 'Thalys': return `THA${Math.floor(rand() * 900) + 9000}`;
    case 'Metro 4': return `M4-${n}`;
    case 'Metro 5': return `M5-${n}`;
    case 'Metro 6': return `M6-${n}`;
  }
}

function generateStatus(rand: () => number): { status: TrainStatus; delayMinutes: number } {
  const r = rand();
  if (r < 0.72) return { status: 'on-time', delayMinutes: 0 };
  if (r < 0.92) return { status: 'delayed', delayMinutes: Math.floor(rand() * 25) + 3 };
  return { status: 'cancelled', delayMinutes: 0 };
}

function generateCrowdLevel(rand: () => number, hour: number): CrowdLevel {
  const isPeak = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
  const r = rand();
  if (isPeak) {
    if (r < 0.15) return 'low';
    if (r < 0.45) return 'medium';
    return 'high';
  }
  if (r < 0.50) return 'low';
  if (r < 0.85) return 'medium';
  return 'high';
}

export function generateTrains(now: Date, station: 'gare-du-nord' | 'bir-hakeim' = 'gare-du-nord'): Train[] {
  const trains: Train[] = [];
  const dayMinutes = now.getHours() * 60 + now.getMinutes();
  const daySeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

  const stationTypes: Record<string, TrainType[]> = {
    'gare-du-nord': ['RER B', 'RER D', 'Transilien H', 'Transilien K', 'TGV', 'Eurostar', 'Thalys', 'Metro 4', 'Metro 5'],
    'bir-hakeim': ['Metro 6'],
  };

  const trainTypes = stationTypes[station];

  for (const type of trainTypes) {
    const freq = FREQUENCY[type];
    const startMin = dayMinutes - 30;
    const endMin = dayMinutes + 120;

    for (let min = startMin; min < endMin; min += freq) {
      const rand = seededRandom(daySeed + min * 7 + type.charCodeAt(0) * 31 + station.charCodeAt(0));

      for (const direction of ['departure', 'arrival'] as Direction[]) {
        const offsetMin = Math.floor(rand() * (freq - 1));
        const trainMin = min + offsetMin;
        const scheduled = new Date(now);
        scheduled.setHours(Math.floor(trainMin / 60) % 24, trainMin % 60, 0, 0);

        const { status, delayMinutes } = generateStatus(rand);
        const expected = new Date(scheduled);
        if (status === 'delayed') {
          expected.setMinutes(expected.getMinutes() + delayMinutes);
        }

        const dest = pick(DESTINATIONS[type], rand);
        const orig = pick(ORIGINS[type], rand);
        const crowdLevel = generateCrowdLevel(rand, now.getHours());

        trains.push({
          id: `${type}-${direction}-${trainMin}-${station}-${rand().toString(36).slice(2, 6)}`,
          type,
          trainNumber: generateTrainNumber(type, rand),
          destination: dest,
          origin: orig,
          scheduledTime: scheduled,
          expectedTime: expected,
          status,
          platform: pick(PLATFORMS[type], rand),
          direction,
          delayMinutes,
          crowdLevel,
        });
      }
    }
  }

  trains.sort((a, b) => a.expectedTime.getTime() - b.expectedTime.getTime());
  return trains;
}

// Eurostar London departures specifically
export function generateEurostarLondon(now: Date): Train[] {
  const all = generateTrains(now, 'gare-du-nord');
  return all.filter(t => t.type === 'Eurostar' && t.destination === 'London St Pancras' && t.direction === 'departure');
}

// Eurostar from London St Pancras to Paris
export function generateEurostarFromLondon(now: Date): Train[] {
  const trains: Train[] = [];
  const daySeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const dayMinutes = now.getHours() * 60 + now.getMinutes();

  // Eurostar runs roughly every 60-90 min from St Pancras
  const departureTimes = [355, 415, 495, 555, 615, 675, 735, 795, 855, 915, 975, 1035, 1095, 1155, 1215, 1275];

  for (const depMin of departureTimes) {
    if (depMin < dayMinutes - 30 || depMin > dayMinutes + 300) continue;

    const rand = seededRandom(daySeed + depMin * 13 + 999);
    const scheduled = new Date(now);
    scheduled.setHours(Math.floor(depMin / 60), depMin % 60, 0, 0);

    const { status, delayMinutes } = generateStatus(rand);
    const expected = new Date(scheduled);
    if (status === 'delayed') expected.setMinutes(expected.getMinutes() + delayMinutes);

    const arrivalMin = depMin + 137; // ~2h17m journey
    const arrival = new Date(now);
    arrival.setHours(Math.floor(arrivalMin / 60), arrivalMin % 60, 0, 0);

    trains.push({
      id: `eurostar-lon-${depMin}`,
      type: 'Eurostar',
      trainNumber: `ES${9100 + Math.floor(rand() * 90)}`,
      destination: 'Paris Gare du Nord',
      origin: 'London St Pancras',
      scheduledTime: scheduled,
      expectedTime: expected,
      status,
      platform: pick(['5', '6', '7', '8', '9', '10', '11'], rand),
      direction: 'departure',
      delayMinutes,
      crowdLevel: generateCrowdLevel(rand, Math.floor(depMin / 60)),
    });
  }

  return trains;
}
