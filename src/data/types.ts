export type TrainType = 'RER B' | 'RER D' | 'Transilien H' | 'Transilien K' | 'TGV' | 'Eurostar' | 'Thalys';

export type TrainStatus = 'on-time' | 'delayed' | 'cancelled';

export type Direction = 'departure' | 'arrival';

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
}

export const TRAIN_COLORS: Record<TrainType, string> = {
  'RER B': '#4B82C4',
  'RER D': '#00A84F',
  'Transilien H': '#8B6508',
  'Transilien K': '#C4A028',
  'TGV': '#9B2335',
  'Eurostar': '#FFD700',
  'Thalys': '#E4002B',
};
