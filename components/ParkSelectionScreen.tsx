import React from 'react';
import type { Park } from '../types.ts';

interface ParkSelectionScreenProps {
  parks: Park[];
  onSelectPark: (park: Park) => void;
}

const ParkSelectionScreen: React.FC<ParkSelectionScreenProps> = ({ parks, onSelectPark }) => {
  return (
    <div className="text-center p-8 rounded-2xl magic-container">
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-4 tracking-wider">Choisissez votre Parc</h1>
      <p className="text-lg md:text-xl text-gray-200 mb-8">
        L'aventure vous attend. Où souhaitez-vous commencer ?
      </p>
      <div className="space-y-4">
        {parks.map(park => (
          <button
            key={park.id}
            onClick={() => onSelectPark(park)}
            className="w-full text-left p-4 bg-purple-900/50 hover:bg-purple-800/70 border border-purple-400 rounded-lg transition-all duration-300 transform hover:scale-105 hover:border-yellow-400 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <div>
              <h2 className="font-bold text-2xl text-yellow-400 font-magic">{park.name}</h2>
              <p className="text-gray-300">{park.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ParkSelectionScreen);