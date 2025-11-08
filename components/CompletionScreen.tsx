import React from 'react';

interface CompletionScreenProps {
  onRestart: () => void;
  message?: string;
}

const CompletionScreen = ({ onRestart, message }: CompletionScreenProps) => {
  const completionText = message || "Vous avez résolu toutes les énigmes et découvert les secrets du parc. Votre nom restera gravé dans les légendes du royaume !";

  return (
    <div className="text-center p-8 rounded-2xl magic-container">
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-4 tracking-wider">Félicitations !</h1>
      <p className="text-lg md:text-xl text-gray-200 mb-8">
        {completionText}
      </p>
      <button
        onClick={onRestart}
        className="font-magic bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30 transform hover:-translate-y-1"
      >
        Nouvelle Aventure
      </button>
    </div>
  );
};

export default CompletionScreen;