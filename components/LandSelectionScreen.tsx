import React from 'react';
import type { Park, Land, Quest } from '../types.ts';
import { MapIcon } from './icons/MapIcon.tsx';
import { CompassIcon } from './icons/CompassIcon.tsx';

interface LandSelectionScreenProps {
  park: Park;
  onSelectLand: (land: Land) => void;
  onSelectQuest: (quest: Quest) => void;
  onBack: () => void;
}

const LandSelectionScreen: React.FC<LandSelectionScreenProps> = ({ park, onSelectLand, onSelectQuest, onBack }) => {
  return (
    <div className="text-center p-6 md:p-8 rounded-2xl magic-container">
      <button 
        onClick={onBack} 
        className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/50 backdrop-blur-sm font-bold py-2 px-4 rounded-full text-sm transform hover:scale-105 transition-transform duration-300 shadow-lg" 
        style={{ color: 'var(--accent-color)' }}
      >
        <MapIcon />
        Retour
      </button>
      <h1 className="text-4xl font-bold text-yellow-300 mb-2 tracking-wider">{park.name}</h1>
      <p className="text-lg text-gray-200 mb-6">
        Quel monde mystérieux souhaitez-vous explorer ?
      </p>
      <div className="space-y-4">
        {park.grandQuest && (
          <button
            onClick={() => onSelectQuest(park.grandQuest!)}
            className="w-full text-left p-4 bg-yellow-500/10 hover:bg-yellow-500/20 border-2 border-yellow-400 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/30"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-400 text-purple-900">
                <CompassIcon />
              </div>
              <div>
                <h2 className="font-bold text-xl text-yellow-300">{park.grandQuest.title}</h2>
                <p className="text-yellow-100/90 text-sm">{park.grandQuest.description}</p>
              </div>
            </div>
          </button>
        )}

        {park.grandQuest && <hr className="border-yellow-200/20" />}
        
        {park.lands.map(land => (
          <button
            key={land.id}
            onClick={() => onSelectLand(land)}
            className="w-full text-left p-4 bg-black/20 hover:bg-black/40 border border-purple-400 rounded-lg transition-all duration-300 transform hover:scale-105 hover:border-yellow-400 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <div>
              <h2 className="font-bold text-xl text-yellow-400">{land.name}</h2>
              <p className="text-gray-300">{land.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(LandSelectionScreen);