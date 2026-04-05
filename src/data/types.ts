export type TrainType =
  | 'RER B' | 'RER D'
  | 'Transilien H' | 'Transilien K'
  | 'TGV' | 'Eurostar' | 'Thalys'
  | 'Metro 4' | 'Metro 5' | 'Metro 6';

export type TrainStatus = 'on-time' | 'delayed' | 'cancelled';

export type Direction = 'departure' | 'arrival';

export type CrowdLevel = 'low' | 'medium' | 'high';

export interface Train {
  id: string;
  type: TrainType;
  trainNumber: string;
  destination: string;
  origin: string;
  scheduledTime: Date;
  expectedTime: Date;
  status: TrainStatus;
  platform: string;
  direction: Direction;
  delayMinutes: number;
  crowdLevel: CrowdLevel;
}

export const TRAIN_COLORS: Record<TrainType, string> = {
  'RER B': '#4B82C4',
  'RER D': '#00A84F',
  'Transilien H': '#8B6508',
  'Transilien K': '#C4A028',
  'TGV': '#9B2335',
  'Eurostar': '#1D3660',
  'Thalys': '#E4002B',
  'Metro 4': '#BB4D98',
  'Metro 5': '#F28E42',
  'Metro 6': '#77C695',
};

export interface Restaurant {
  name: string;
  cuisine: string;
  price: string;
  distance: string;
  rating: number;
  address: string;
}

export interface StationAccessibility {
  station: string;
  stairs: boolean;
  escalators: boolean;
  lifts: boolean;
  notes: string;
}
