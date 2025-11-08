import React, { useState, useCallback } from 'react';
import { generateMagicImageHint } from './services/geminiService';
import type { Riddle } from './types';
import { SparkleIcon } from './components/icons/SparkleIcon';
import { LightbulbIcon } from './components/icons/LightbulbIcon';

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
  
  const handleVerification = useCallback(() => {
    setIsVerifying(true);
    setFeedback('');

    // Simulate a small delay for UX
    setTimeout(() => {
      const isAnswerCorrect = answer.trim().toLowerCase() === riddle.answer.toLowerCase();
  
      if (isAnswerCorrect) {
        setFeedback('Correct ! Préparez-vous pour la prochaine énigme...');
        setTimeout(() => {
          onCorrect();
          setAnswer('');
          setFeedback('');
          setHint(null);
          setMagicImage(null);
          setIsVerifying(false);
        }, 2000);
      } else {
        setFeedback('Mauvaise réponse. Essayez encore !');
        setIsVerifying(false);
      }
    }, 500);
    
  }, [answer, riddle.answer, onCorrect]);

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
    <div key={riddle.id} className="bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-purple-500/50 animate-fade-in-slow">
      <div className="text-center mb-6">
        <p className="text-yellow-400 font-bold">Énigme {progress.current} / {progress.total}</p>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
          <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${(progress.current / progress.total) * 100}%` }}></div>
        </div>
      </div>
      
      <p className="text-xl md:text-2xl text-center text-gray-100 leading-relaxed mb-6">
        {riddle.question}
      </p>

      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Votre réponse..."
        className="w-full bg-indigo-900/50 border-2 border-purple-400 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 mb-4"
      />
      
      {feedback && <p className="text-center text-yellow-300 my-4 animate-pulse">{feedback}</p>}

      <button
        onClick={handleVerification}
        disabled={isVerifying}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isVerifying ? 'Vérification...' : 'Vérifier la Réponse'}
      </button>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button onClick={() => { setHint(riddle.hint); setMagicImage(null); }} className="flex-1 flex items-center justify-center gap-2 bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-purple-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
          <LightbulbIcon />
          Indice Classique
        </button>
        <button 
          onClick={handleGenerateMagicImage} 
          disabled={isGeneratingImage} 
          className={`flex-1 flex items-center justify-center gap-2 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-purple-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 ${!isGeneratingImage ? 'animate-magic-pulse' : ''}`}
        >
          <SparkleIcon />
          {isGeneratingImage ? 'Création...' : 'Indice Visuel Magique'}
        </button>
      </div>
      
      {hint && !magicImage && (
        <div className="mt-4 p-4 bg-yellow-900/50 border border-yellow-500 rounded-lg">
          <p><span className="font-bold">Indice :</span> {hint}</p>
        </div>
      )}
      {isGeneratingImage && (
        <div className="mt-4 p-4 text-center text-cyan-300">
          <p>Le Pinceau Enchanté dessine votre indice...</p>
        </div>
      )}
      {magicImage && (
         <div className="mt-4 p-4 bg-cyan-900/50 border border-cyan-400 rounded-lg">
          <p className="font-bold text-cyan-300 mb-2">Vision Magique :</p>
          <img src={magicImage} alt="Indice visuel généré par IA" className="rounded-lg w-full h-auto object-cover" />
        </div>
      )}
    </div>
  );
};

export default RiddleView;