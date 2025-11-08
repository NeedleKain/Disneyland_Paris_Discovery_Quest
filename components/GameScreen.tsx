import React, { useState, useEffect } from 'react';
import RiddleView from './RiddleView.tsx';
import CompletionScreen from './CompletionScreen.tsx';
import MiniGameView from './MiniGameView.tsx';
import type { Quest } from '../types.ts';
import { MapIcon } from './icons/MapIcon.tsx';

interface GameScreenProps {
  quest: Quest;
  onFinish: () => void;
  onBack: () => void;
  currentRiddleIndex: number;
  onCorrectAnswer: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ quest, onFinish, onBack, currentRiddleIndex, onCorrectAnswer }) => {
  const isCompleted = currentRiddleIndex >= quest.riddles.length;
  const currentRiddle = quest.riddles[currentRiddleIndex];

  const [phase, setPhase] = useState<'riddle' | 'minigame'>('riddle');

  // Reset to riddle view when riddle changes
  useEffect(() => {
    setPhase('riddle');
  }, [currentRiddleIndex]);

  const handleRiddleCorrect = () => {
    if (currentRiddle.miniGame) {
      setPhase('minigame');
    } else {
      onCorrectAnswer();
    }
  };

  const handleMiniGameComplete = () => {
    setTimeout(() => {
        onCorrectAnswer();
    }, 1500);
  };


  return (
    <div>
        <div className="absolute top-4 left-4 z-20">
            <button
                onClick={onBack}
                className="flex items-center gap-2 bg-black/50 backdrop-blur-sm font-bold py-3 px-5 rounded-full text-base transform hover:scale-105 transition-transform duration-300 shadow-lg"
                style={{ color: 'var(--accent-color)' }}
            >
                <MapIcon />
                Changer de Quête
            </button>
        </div>
      {isCompleted ? (
        <CompletionScreen onRestart={onFinish} message={quest.completionMessage} />
      ) : phase === 'minigame' && currentRiddle.miniGame ? (
         <MiniGameView
            key={`${currentRiddle.id}-minigame`}
            miniGame={currentRiddle.miniGame}
            onComplete={handleMiniGameComplete}
        />
      ) : (
        <RiddleView
          key={currentRiddle.id}
          riddle={currentRiddle}
          onCorrect={handleRiddleCorrect}
          progress={{
            current: currentRiddleIndex + 1,
            total: quest.riddles.length,
          }}
        />
      )}
    </div>
  );
};

export default React.memo(GameScreen);