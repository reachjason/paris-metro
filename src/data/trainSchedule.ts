import type { Train, TrainType, TrainStatus, Direction } from './types';

const DESTINATIONS: Record<TrainType, string[]> = {
  'RER B': ['Aeroport CDG T2', 'Mitry-Claye', 'Aulnay-sous-Bois', 'Robinson', 'Saint-Remy-les-Chevreuse', 'Massy-Palaiseau'],
  'RER D': ['Orry-la-Ville', 'Creil', 'Villiers-le-Bel', 'Melun', 'Corbeil-Essonnes', 'Juvisy'],
  'Transilien H': ['Luzarches', 'Persan-Beaumont', 'Pontoise', 'Valmondois'],
  'Transilien K': ['Crepy-en-Valois', 'Mitry-Claye', 'Dammartin'],
  'TGV': ['Lille Europe', 'Lyon Part-Dieu', 'Marseille St-Charles', 'Bordeaux St-Jean', 'Strasbourg', 'Rennes', 'Nantes', 'Dunkerque', 'Valenciennes', 'Arras'],
  'Eurostar': ['London St Pancras', 'Brussels Midi', 'Amsterdam Centraal'],
  'Thalys': ['Brussels Midi', 'Amsterdam Centraal', 'Cologne Hbf', 'Dusseldorf Hbf'],
};

const ORIGINS: Record<TrainType, string[]> = {
  'RER B': ['Aeroport CDG T2', 'Mitry-Claye', 'Robinson', 'Saint-Remy-les-Chevreuse'],
  'RER D': ['Orry-la-Ville', 'Creil', 'Melun', 'Corbeil-Essonnes'],
  'Transilien H': ['Luzarches', 'Persan-Beaumont', 'Pontoise'],
  'Transilien K': ['Crepy-en-Valois', 'Mitry-Claye'],
  'TGV': ['Lille Europe', 'Lyon Part-Dieu', 'Marseille St-Charles', 'Bordeaux St-Jean', 'Strasbourg', 'Rennes', 'Dunkerque', 'Arras'],
  'Eurostar': ['London St Pancras', 'Brussels Midi', 'Amsterdam Centraal'],
  'Thalys': ['Brussels Midi', 'Amsterdam Centraal', 'Cologne Hbf'],
};

// Frequency in minutes for each train type
const FREQUENCY: Record<TrainType, number> = {
  'RER B': 4,
  'RER D': 5,
  'Transilien H': 15,
  'Transilien K': 20,
  'TGV': 12,
  'Eurostar': 60,
  'Thalys': 45,
};

const PLATFORMS: Record<TrainType, string[]> = {
  'RER B': ['B1', 'B2', 'B3'],
  'RER D': ['D1', 'D2'],
  'Transilien H': ['3', '4', '5', '6'],
  'Transilien K': ['7', '8'],
  'TGV': ['9', '11', '13', '15', '17', '19'],
  'Eurostar': ['2', '4', '6'],
  'Thalys': ['21', '23', '25'],
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
  }
}

function generateStatus(rand: () => number): { status: TrainStatus; delayMinutes: number } {
  const r = rand();
  if (r < 0.70) return { status: 'on-time', delayMinutes: 0 };
  if (r < 0.90) return { status: 'delayed', delayMinutes: Math.floor(rand() * 25) + 3 };
  return { status: 'cancelled', delayMinutes: 0 };
}

export function generateTrains(now: Date): Train[] {
  const trains: Train[] = [];
  const dayMinutes = now.getHours() * 60 + now.getMinutes();
  const daySeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

  const trainTypes: TrainType[] = ['RER B', 'RER D', 'Transilien H', 'Transilien K', 'TGV', 'Eurostar', 'Thalys'];

  for (const type of trainTypes) {
    const freq = FREQUENCY[type];
    // Generate trains from 90 min ago to 120 min ahead
    const startMin = dayMinutes - 90;
    const endMin = dayMinutes + 120;

    for (let min = startMin; min < endMin; min += freq) {
      const rand = seededRandom(daySeed + min * 7 + type.charCodeAt(0) * 31);

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

        trains.push({
          id: `${type}-${direction}-${trainMin}-${rand().toString(36).slice(2, 6)}`,
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
        });
      }
    }
  }

  // Sort by expected time
  trains.sort((a, b) => a.expectedTime.getTime() - b.expectedTime.getTime());
  return trains;
}
