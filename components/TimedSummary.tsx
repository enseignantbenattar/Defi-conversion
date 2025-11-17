
import React from 'react';

interface TimedSummaryProps {
  score: number;
  attempts: number;
  onPlayAgain: () => void;
}

export const TimedSummary: React.FC<TimedSummaryProps> = ({ score, attempts, onPlayAgain }) => {
    const percentage = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-amber-500 dark:text-amber-400 mb-4">Temps écoulé !</h1>
        
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl my-8">
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-6">Votre score final</h2>
            <div className="flex justify-center items-center gap-8 text-center text-slate-600 dark:text-slate-300">
              <div className="flex flex-col items-center p-4">
                <span className="text-4xl font-bold text-sky-500">{score}</span>
                <span className="text-md">Correctes</span>
              </div>
               <div className="flex flex-col items-center p-4">
                <span className="text-4xl font-bold text-slate-500">{attempts}</span>
                <span className="text-md">Tentatives</span>
              </div>
              <div className="flex flex-col items-center p-4">
                <span className="text-4xl font-bold text-amber-500">{percentage}%</span>
                <span className="text-md">Précision</span>
              </div>
            </div>
        </div>

        <button
            onClick={onPlayAgain}
            className="px-10 py-4 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
            Rejouer
        </button>
    </div>
  );
};
