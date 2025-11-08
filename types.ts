import type { ReactNode } from 'react';

// FIX: Added Coordinates interface for geolocation.
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MiniGame {
  id: 'sineWave' | 'pipeGrid' | 'binarySequence';
  title: string;
  description: string;
}

export interface Riddle {
  id: number;
  question: string;
  answer: string;
  // FIX: Added location property for geolocation checks.
  location: Coordinates;
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