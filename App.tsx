import React, { useState, useEffect, useMemo, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen.tsx';
import ParkSelectionScreen from './components/ParkSelectionScreen.tsx';
import LandSelectionScreen from './components/LandSelectionScreen.tsx';
import QuestSelectionScreen from './components/QuestSelectionScreen.tsx';
import GameScreen from './components/GameScreen.tsx';
import { PARKS } from './constants.ts';
import type { Park, Land, Quest } from './types.ts';

type GameState = 'welcome' | 'park_selection' | 'land_selection' | 'quest_selection' | 'playing';

function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [selectedParkId, setSelectedParkId] = useState<string | null>(null);
  const [selectedLandId, setSelectedLandId] = useState<string | null>(null);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);

  const selectedPark = useMemo(() => PARKS.find(p => p.id === selectedParkId), [selectedParkId]);
  const selectedLand = useMemo(() => selectedPark?.lands.find(l => l.id === selectedLandId), [selectedPark, selectedLandId]);
  
  const selectedQuest = useMemo(() => {
    if (!selectedQuestId) return null;
    if (selectedPark && selectedPark.grandQuest?.id === selectedQuestId) {
        return selectedPark.grandQuest;
    }
    return selectedLand?.quests.find(q => q.id === selectedQuestId);
  }, [selectedPark, selectedLand, selectedQuestId]);


  // Dynamic Theming Effect
  useEffect(() => {
    const root = document.documentElement;
    if (selectedLand) {
      const theme = selectedLand.theme;
      root.style.setProperty('--primary-color', theme.primary);
      root.style.setProperty('--accent-color', theme.accent);
      root.style.setProperty('--text-color', theme.text);
      root.style.setProperty('--container-bg', theme.containerBg);
      root.style.setProperty('--accent-gradient', theme.backgroundGradient);
      root.style.setProperty('--button-text-color', theme.buttonText);
    } else {
      // Reset to default theme if no land is selected (e.g., during grand quest)
      root.style.setProperty('--primary-color', '#a855f7');
      root.style.setProperty('--accent-color', '#fde047');
      root.style.setProperty('--text-color', '#f3e8ff');
      root.style.setProperty('--container-bg', 'rgba(18, 10, 35, 0.6)');
      root.style.setProperty('--accent-gradient', 'linear-gradient(to bottom right, #a855f7, #fde047)');
      root.style.setProperty('--button-text-color', '#1e1b4b');
    }
  }, [selectedLand]);


  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('disneylandQuestProgress');
    if (savedProgress) {
      try {
        const { parkId, landId, questId, riddleIndex, gameState: savedGameState } = JSON.parse(savedProgress);
        
        if (savedGameState === 'playing' && parkId && questId) {
          setSelectedParkId(parkId);
          setSelectedLandId(landId || null); // landId can be null for grand quests
          setSelectedQuestId(questId);
          setCurrentRiddleIndex(riddleIndex || 0);
          setGameState('playing');
        } else if (savedGameState) {
          setGameState(savedGameState);
          setSelectedParkId(parkId || null);
          setSelectedLandId(landId || null);
          setSelectedQuestId(questId || null);
        }
      } catch (e) {
        console.error("Failed to parse saved progress", e);
        localStorage.removeItem('disneylandQuestProgress');
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    const progress = {
      gameState,
      parkId: selectedParkId,
      landId: selectedLandId,
      questId: selectedQuestId,
      riddleIndex: currentRiddleIndex,
    };
    localStorage.setItem('disneylandQuestProgress', JSON.stringify(progress));
  }, [gameState, selectedParkId, selectedLandId, selectedQuestId, currentRiddleIndex]);

  const handleStart = useCallback(() => setGameState('park_selection'), []);
  
  const handleParkSelect = useCallback((park: Park) => {
    setSelectedParkId(park.id);
    setGameState('land_selection');
  }, []);

  const handleLandSelect = useCallback((land: Land) => {
    setSelectedLandId(land.id);
    setGameState('quest_selection');
  }, []);
  
  const handleQuestSelect = useCallback((quest: Quest) => {
    setSelectedQuestId(quest.id);
    setCurrentRiddleIndex(0);
    setGameState('playing');
  }, []);
  
  const handleGrandQuestSelect = useCallback((quest: Quest) => {
    setSelectedLandId(null); // No specific land for a grand quest
    setSelectedQuestId(quest.id);
    setCurrentRiddleIndex(0);
    setGameState('playing');
  }, []);

  const handleBackToParkSelection = useCallback(() => {
    setSelectedParkId(null);
    setSelectedLandId(null);
    setGameState('park_selection');
  }, []);

  const handleBackToLandSelection = useCallback(() => {
    setSelectedLandId(null);
    setSelectedQuestId(null);
    setGameState('land_selection');
  }, []);

  const handleBackToQuestSelection = useCallback(() => {
    setGameState('quest_selection');
  }, []);

  const handleCorrectAnswer = useCallback(() => setCurrentRiddleIndex(prev => prev + 1), []);
  
  const handleGameFinish = useCallback(() => {
    if (!selectedLandId) {
        setGameState('land_selection');
    } else {
        setGameState('quest_selection');
    }
  }, [selectedLandId]);
  
  const renderContent = () => {
    switch (gameState) {
      case 'park_selection':
        return <ParkSelectionScreen parks={PARKS} onSelectPark={handleParkSelect} />;
      case 'land_selection':
        return selectedPark && <LandSelectionScreen park={selectedPark} onSelectLand={handleLandSelect} onSelectQuest={handleGrandQuestSelect} onBack={handleBackToParkSelection} />;
      case 'quest_selection':
        return selectedLand && <QuestSelectionScreen land={selectedLand} onSelectQuest={handleQuestSelect} onBack={handleBackToLandSelection} />;
      case 'playing':
        return selectedQuest && (
            <GameScreen 
              quest={selectedQuest} 
              onFinish={handleGameFinish} 
              onBack={selectedLandId ? handleBackToQuestSelection : handleBackToLandSelection}
              currentRiddleIndex={currentRiddleIndex}
              onCorrectAnswer={handleCorrectAnswer}
            />
          );
      case 'welcome':
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat transition-colors duration-1000" style={{ backgroundImage: "url('./background.jpg')" }}>
      <div className="absolute inset-0 background-overlay z-0"></div>
      <div className="relative z-10 w-full max-w-md mx-auto">
        {renderContent()}
      </div>
    </main>
  );
}

export default App;