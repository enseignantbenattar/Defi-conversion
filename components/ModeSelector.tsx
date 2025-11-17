
import React from 'react';

type GameMode = 'classic' | 'timed' | 'specific';

interface ModeSelectorProps {
  onSelectMode: (mode: GameMode, durationInSeconds?: number) => void;
}

const ModeCard: React.FC<{title: string; description: string; onClick: () => void;}> = ({ title, description, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-sky-500 focus:ring-opacity-50 text-left w-full h-full flex flex-col"
  >
    <h3 className="text-2xl font-bold text-sky-500 dark:text-sky-400 mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400">{description}</p>
  </button>
);


export const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className="w-full max-w-3xl text-center">
      <h1 className="text-4xl font-bold text-sky-600 dark:text-sky-400 mb-2">Défi Conversion</h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">Choisissez un mode de jeu.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ModeCard
          title="Classique"
          description="Entraînez-vous sans limite de temps."
          onClick={() => onSelectMode('classic')}
        />
        
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg text-left w-full h-full flex flex-col">
          <h3 className="text-2xl font-bold text-sky-500 dark:text-sky-400 mb-3">Contre la montre</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow">Combien de conversions en un temps limité ?</p>
          <div className="flex flex-col gap-3">
              <button onClick={() => onSelectMode('timed', 60)} className="w-full px-6 py-2 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-transform transform hover:scale-105">
                1 minute
              </button>
              <button onClick={() => onSelectMode('timed', 120)} className="w-full px-6 py-2 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-transform transform hover:scale-105">
                2 minutes
              </button>
              <button onClick={() => onSelectMode('timed', 180)} className="w-full px-6 py-2 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-transform transform hover:scale-105">
                3 minutes
              </button>
          </div>
        </div>
        
        <ModeCard
          title="Pratique Ciblée"
          description="Choisissez les unités à pratiquer."
          onClick={() => onSelectMode('specific')}
        />
      </div>
    </div>
  );
};
