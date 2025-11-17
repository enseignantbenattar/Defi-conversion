
import React, { useState } from 'react';
import { Unit } from '../types';

interface SpecificUnitPracticeSetupProps {
  onStart: (selectedUnits: Unit[]) => void;
  onBack: () => void;
}

export const SpecificUnitPracticeSetup: React.FC<SpecificUnitPracticeSetupProps> = ({ onStart, onBack }) => {
  const allUnits = Object.values(Unit);
  const [selectedUnits, setSelectedUnits] = useState<Unit[]>([]);

  const handleToggleUnit = (unit: Unit) => {
    setSelectedUnits(prev =>
      prev.includes(unit) ? prev.filter(u => u !== unit) : [...prev, unit]
    );
  };

  const canStart = selectedUnits.length >= 2;

  return (
    <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-sky-600 dark:text-sky-400 mb-2">Pratique Ciblée</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">Sélectionnez au moins deux unités à pratiquer.</p>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {allUnits.map(unit => (
                    <label key={unit} className="flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-colors duration-200 dark:border-slate-600 has-[:checked]:bg-sky-500 has-[:checked]:border-sky-500 has-[:checked]:text-white">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={selectedUnits.includes(unit)}
                            onChange={() => handleToggleUnit(unit)}
                        />
                        <span className="font-semibold">{unit.toUpperCase()}</span>
                    </label>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button
                    onClick={onBack}
                    className="w-full sm:w-auto px-8 py-3 bg-slate-500 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                  >
                    Retour
                  </button>
                <button
                    onClick={() => onStart(selectedUnits)}
                    disabled={!canStart}
                    className="w-full sm:w-auto px-8 py-3 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-transform transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none dark:disabled:bg-slate-600"
                >
                    Commencer
                </button>
            </div>
        </div>
    </div>
  );
};
