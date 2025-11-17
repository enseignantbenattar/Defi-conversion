import React, { useState } from 'react';
import { Unit } from '../types';

const initialDigits: Record<Unit, string> = {
  [Unit.KM]: '', [Unit.HM]: '', [Unit.DAM]: '', [Unit.M]: '', [Unit.DM]: '', [Unit.CM]: '', [Unit.MM]: '',
};

const EraserIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m-1.125 9.75h2.25m-2.25 0h-1.5m-1.125 0H5.625m7.5 0h1.875m-1.875 0h-1.5m2.625 0H12m-6.75 4.5h6.75" />
    </svg>
);


export const UnitTable: React.FC = () => {
  const units = Object.values(Unit);
  const [digits, setDigits] = useState<Record<Unit, string>>(initialDigits);
  const [decimalUnit, setDecimalUnit] = useState<Unit | null>(null);

  const handleDigitChange = (unit: Unit, value: string) => {
    // Allow only a single numeric digit
    const newDigit = value.slice(-1).replace(/[^0-9]/, '');
    setDigits(prev => ({ ...prev, [unit]: newDigit }));
  };

  const handleDecimalClick = (unit: Unit) => {
    // Toggle comma position: if it's already there, remove it. Otherwise, place it.
    setDecimalUnit(prev => (prev === unit ? null : unit));
  };

  const clearTable = () => {
    setDigits(initialDigits);
    setDecimalUnit(null);
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Tableau de Conversion Manuel</h2>
        <button 
          onClick={clearTable} 
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md font-medium text-slate-600 dark:text-slate-300 transition"
          aria-label="Effacer le tableau"
        >
          <EraserIcon className="h-4 w-4" />
          Effacer
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex text-center border-2 border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          {units.map((unit, index) => (
            <div key={unit} className="flex-1 min-w-[60px]">
              {/* Header */}
              <div className="p-3 font-bold bg-slate-100 dark:bg-slate-700 border-b-2 border-slate-200 dark:border-slate-600">
                {unit}
              </div>
              {/* Input Cell */}
              <div className="relative border-r-2 border-slate-200 dark:border-slate-600 last:border-r-0">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digits[unit]}
                  onChange={(e) => handleDigitChange(unit, e.target.value)}
                  className="w-full h-12 p-1 text-center bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-sky-500 text-2xl font-mono"
                  aria-label={`Chiffre pour ${unit}`}
                />
                {/* Comma button placed *after* this unit's column */}
                {index < units.length - 1 && (
                  <button
                    onClick={() => handleDecimalClick(unit)}
                    className="absolute top-0 -right-3 h-full w-6 flex items-center justify-center cursor-pointer z-10 group"
                    aria-label={`Placer la virgule après ${unit}`}
                  >
                    <span className={`font-bold text-3xl transition-colors ${decimalUnit === unit ? 'text-sky-500' : 'text-transparent group-hover:text-slate-400'}`}>
                      ,
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
       <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
        Placez un chiffre par colonne. Cliquez entre les colonnes pour ajouter une virgule.
      </p>
    </div>
  );
};
