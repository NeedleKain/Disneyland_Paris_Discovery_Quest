import type { ReactNode } from 'react';

export interface MiniGame {
  id: 'sineWave' | 'pipeGrid' | 'binarySequence';
  title: string;
  description: string;
}

export interface Riddle {
  id: number;
  question: string;
  answer: string;
  locationName: string;
  hint: string;
  image: string;
  options?: string[];
  miniGame?: MiniGame;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  riddles: Riddle[];
  completionMessage?: string;
}

export interface Theme {
  primary: string;
  accent: string;
  text: string;
  backgroundGradient: string;
  containerBg: string;
  buttonText: string;
}

export interface Land {
  id: string;
  name: string;
  description: string;
  theme: Theme;
  quests: Quest[];
}

export interface Park {
  id: string;
  name: string;
  description: string;
  lands: Land[];
  grandQuest?: Quest;
}

// FIX: Add Coordinates interface for geolocation data.
export interface Coordinates {
  latitude: number;
  longitude: number;
}
