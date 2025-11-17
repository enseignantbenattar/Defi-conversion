
import React from 'react';

interface ScoreBoardProps {
  score: number;
  attempts: number;
  timeLeft?: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, attempts, timeLeft }) => {
  const percentage = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <div className="flex justify-center items-center gap-4 sm:gap-8 text-center text-slate-600 dark:text-slate-300 mb-8 flex-wrap">
       {typeof timeLeft === 'number' && (
         <div className="flex flex-col items-center p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 shadow-sm order-first">
          <span className="text-3xl font-bold text-red-500">{timeLeft}s</span>
          <span className="text-sm">Temps</span>
        </div>
      )}
      <div className="flex flex-col items-center p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 shadow-sm">
        <span className="text-3xl font-bold text-sky-500">{score}</span>
        <span className="text-sm">Correctes</span>
      </div>
       <div className="flex flex-col items-center p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 shadow-sm">
        <span className="text-3xl font-bold text-slate-500">{attempts}</span>
        <span className="text-sm">Tentatives</span>
      </div>
      <div className="flex flex-col items-center p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 shadow-sm">
        <span className="text-3xl font-bold text-amber-500">{percentage}%</span>
        <span className="text-sm">Précision</span>
      </div>
    </div>
  );
};
