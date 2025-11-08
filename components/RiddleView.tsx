import React, { useState, useCallback } from 'react';
import { generateMagicImageHint } from '../services/geminiService.ts';
import type { Riddle } from '../types.ts';
import { SparkleIcon } from './icons/SparkleIcon.tsx';
import { LightbulbIcon } from './icons/LightbulbIcon.tsx';

interface RiddleViewProps {
  riddle: Riddle;
  onCorrect: () => void;
  progress: {
    current: number;
    total: number;
  };
}

const RiddleView: React.FC<RiddleViewProps> = ({ riddle, onCorrect, progress }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [magicImage, setMagicImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [shake, setShake] = useState(false);

  const isMultipleChoice = riddle.options && riddle.options.length > 0;

  const handleVerification = useCallback((userAnswer: string) => {
    if (!userAnswer.trim()) {
      setFeedback('Veuillez sélectionner ou entrer une réponse.');
      setShake(true);
      setTimeout(() => setShake(false), 820);
      return;
    }

    setIsVerifying(true);
    setShake(false);

    // Simulate a small delay for UX feedback
    setTimeout(() => {
      const isAnswerCorrect = userAnswer.trim().toLowerCase() === riddle.answer.toLowerCase();

      if (isAnswerCorrect) {
        setFeedback('Correct ! Préparez-vous pour la prochaine énigme...');
        setTimeout(() => {
          onCorrect();
          // Reset state for the next riddle
          setAnswer('');
          setFeedback('');
          setHint(null);
          setMagicImage(null);
          setIsVerifying(false);
        }, 2000);
      } else {
        setFeedback('Mauvaise réponse. Essayez encore !');
        setIsVerifying(false);
        setShake(true);
        setTimeout(() => setShake(false), 820);
      }
    }, 500);
  }, [riddle.answer, onCorrect]);


  const handleGenerateMagicImage = async () => {
    setIsGeneratingImage(true);
    setMagicImage(null);
    setHint(null);
    const imageUrl = await generateMagicImageHint(riddle);
    if (imageUrl) {
      setMagicImage(imageUrl);
    } else {
      setFeedback("Désolé, la magie n'opère pas pour le moment. Réessayez plus tard.");
    }
    setIsGeneratingImage(false);
  };
  
  return (
    <div key={riddle.id} className={`p-6 md:p-8 rounded-2xl magic-container ${shake ? 'animate-shake' : ''}`}>
      <div className="text-center mb-6">
        <p className="font-bold" style={{ color: 'var(--accent-color)'}}>Énigme {progress.current} / {progress.total}</p>
        <div className="w-full bg-black/30 rounded-full h-2.5 mt-2">
          <div className="h-2.5 rounded-full transition-all duration-500" style={{ width: `${(progress.current / progress.total) * 100}%`, backgroundColor: 'var(--accent-color)' }}></div>
        </div>
      </div>

      <p className="text-xl md:text-2xl text-center leading-relaxed mb-6" style={{ color: 'var(--text-color)'}}>
        {riddle.question}
      </p>

      {isMultipleChoice ? (
        <div className="space-y-3">
          {riddle.options!.map((option) => (
            <button
              key={option}
              onClick={() => handleVerification(option)}
              disabled={isVerifying}
              className="w-full text-center font-bold py-3 px-6 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--button-text-color)' }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); if (!isVerifying) handleVerification(answer); }}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Votre réponse..."
            className="w-full bg-black/20 border-2 rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 mb-4"
            style={{ borderColor: 'var(--primary-color)', color: 'var(--text-color)', '--tw-ring-color': 'var(--accent-color)' } as React.CSSProperties}
          />
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            style={{ backgroundColor: 'var(--primary-color)', color: 'var(--button-text-color)'}}
          >
            {isVerifying ? 'Vérification...' : 'Vérifier la réponse'}
          </button>
        </form>
      )}

      {feedback && <p aria-live="polite" className={`text-center my-4 ${ shake ? 'text-red-400' : 'text-yellow-300'}`}>{feedback}</p>}

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button 
          onClick={() => { setHint(riddle.hint); setMagicImage(null); }} 
          className="flex-1 flex items-center justify-center gap-2 bg-transparent border-2 font-semibold py-2 px-4 rounded-lg transition-colors duration-300" 
          style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-color)'; e.currentTarget.style.color = 'var(--button-text-color)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--accent-color)'; }}
        >
          <LightbulbIcon />
          Indice Classique
        </button>
        <button 
          onClick={handleGenerateMagicImage} 
          disabled={isGeneratingImage} 
          aria-busy={isGeneratingImage} 
          className={`flex-1 flex items-center justify-center gap-2 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-indigo-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 ${!isGeneratingImage ? 'animate-magic-pulse' : ''}`}
        >
          <SparkleIcon />
          {isGeneratingImage ? 'Création...' : 'Indice Visuel Magique'}
        </button>
      </div>
      
      {hint && !magicImage && (
        <div className="mt-4 p-4 bg-black/20 border rounded-lg animate-fade-in" style={{ borderColor: 'var(--accent-color)' }}>
          <p style={{ color: 'var(--text-color)' }}><span className="font-bold" style={{ color: 'var(--accent-color)' }}>Indice :</span> {hint}</p>
        </div>
      )}
      {isGeneratingImage && (
        <div className="mt-4 p-4 text-center text-cyan-300 animate-pulse" aria-live="polite">
          <p>Le Pinceau Enchanté dessine votre indice...</p>
        </div>
      )}
      {magicImage && (
         <div className="mt-4 p-4 bg-cyan-900/50 border border-cyan-400 rounded-lg animate-fade-in">
          <p className="font-bold text-cyan-300 mb-2">Vision Magique :</p>
          <img src={magicImage} alt="Indice visuel généré par IA" className="rounded-lg w-full h-auto object-cover" />
        </div>
      )}
    </div>
  );
};

export default React.memo(RiddleView);