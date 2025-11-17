import React, { useState, useEffect, useCallback } from 'react';
import { UnitTable } from './components/UnitTable';
import { ScoreBoard } from './components/ScoreBoard';
import { FeedbackBanner } from './components/FeedbackBanner';
import { ModeSelector } from './components/ModeSelector';
import { SpecificUnitPracticeSetup } from './components/SpecificUnitPracticeSetup';
import { TimedSummary } from './components/TimedSummary';
import { generateQuestion, convert } from './utils/conversion';
import type { Question, Unit } from './types';

type View = 'menu' | 'specific_setup' | 'game' | 'timed_summary';
type GameMode = 'classic' | 'timed' | 'specific';

const App: React.FC = () => {
  // Game State
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  // App Navigation State
  const [view, setView] = useState<View>('menu');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);

  // Mode-specific State
  const [timeLeft, setTimeLeft] = useState(60);
  const [specificUnits, setSpecificUnits] = useState<Unit[]>([]);

  // Timer Effect
  useEffect(() => {
    if (gameMode === 'timed' && view === 'game' && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timerId);
    }
    if (gameMode === 'timed' && timeLeft === 0 && view === 'game') {
      setView('timed_summary');
    }
  }, [gameMode, view, timeLeft]);

  const resetScores = () => {
    setScore(0);
    setAttempts(0);
  };

  const newQuestion = useCallback(() => {
    const question = generateQuestion(gameMode === 'specific' ? specificUnits : undefined);
    setCurrentQuestion(question);
    const answer = convert(question.value, question.fromUnit, question.toUnit);
    setCorrectAnswer(answer);
    setUserAnswer('');
    setIsCorrect(null);
    setIsAnswered(false);
  }, [gameMode, specificUnits]);

  const handleCheckAnswer = () => {
    if (!userAnswer || isAnswered) return;

    const userAnswerNumber = parseFloat(userAnswer.replace(',', '.'));
    if (isNaN(userAnswerNumber)) {
      alert("Veuillez entrer un nombre valide.");
      return;
    }

    setAttempts(prev => prev + 1);
    if (Math.abs(userAnswerNumber - correctAnswer) < 1e-9) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
    } else {
      setIsCorrect(false);
    }
    setIsAnswered(true);

    if (gameMode === 'timed') {
        setTimeout(() => {
            if (timeLeft > 0) {
                newQuestion();
            }
        }, 1200);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (isAnswered && gameMode !== 'timed') {
        newQuestion();
      } else {
        handleCheckAnswer();
      }
    }
  };

  const handleSelectMode = (mode: GameMode, durationInSeconds?: number) => {
    setGameMode(mode);
    resetScores();
    if (mode === 'classic') {
      setView('game');
    } else if (mode === 'timed') {
      setTimeLeft(durationInSeconds || 60);
      setView('game');
    } else if (mode === 'specific') {
      setView('specific_setup');
    }
  };

  const handleStartSpecific = (units: Unit[]) => {
    setSpecificUnits(units);
    setView('game');
  };

  const resetToMenu = () => {
    resetScores();
    setGameMode(null);
    setView('menu');
  };
  
  // Start game effect
  useEffect(() => {
    if(view === 'game' && gameMode) {
      newQuestion();
    }
  }, [view, gameMode, newQuestion]);


  const renderGame = () => {
    if (!currentQuestion) {
      return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
    }

    return (
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-sky-600 dark:text-sky-400 mb-2">Défi Conversion</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">Entraînez-vous à convertir les unités de longueur.</p>

        <ScoreBoard score={score} attempts={attempts} timeLeft={gameMode === 'timed' ? timeLeft : undefined} />

        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl transition-shadow duration-300">
          <p className="text-2xl font-medium text-slate-700 dark:text-slate-300 mb-4">
            Convertir :
          </p>
          <div className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            {currentQuestion.value}{' '}
            <span className="text-sky-500">{currentQuestion.fromUnit}</span> en{' '}
            <span className="text-amber-500">{currentQuestion.toUnit}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="text"
              inputMode="decimal"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isAnswered}
              placeholder="Votre réponse..."
              className="w-full sm:w-1/2 text-center text-xl p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:cursor-not-allowed"
            />
            {isAnswered && gameMode !== 'timed' ? (
              <button
                onClick={newQuestion}
                className="w-full sm:w-auto px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
              >
                Question Suivante
              </button>
            ) : (
              <button
                onClick={handleCheckAnswer}
                disabled={isAnswered && gameMode === 'timed'}
                className="w-full sm:w-auto px-8 py-3 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-transform transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                Vérifier
              </button>
            )}
          </div>
          <FeedbackBanner 
            isCorrect={isCorrect} 
            correctAnswer={correctAnswer} 
            unit={currentQuestion.toUnit}
          />
        </div>

        <UnitTable />

        <div className="mt-8">
          <button
            onClick={resetToMenu}
            className="px-8 py-3 bg-slate-500 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            Retour au menu
          </button>
        </div>
      </div>
    );
  };
  
  const renderContent = () => {
    switch(view) {
        case 'menu':
            return <ModeSelector onSelectMode={handleSelectMode} />;
        case 'specific_setup':
            return <SpecificUnitPracticeSetup onStart={handleStartSpecific} onBack={resetToMenu} />;
        case 'game':
            return renderGame();
        case 'timed_summary':
            return <TimedSummary score={score} attempts={attempts} onPlayAgain={resetToMenu} />;
        default:
            return <ModeSelector onSelectMode={handleSelectMode} />;
    }
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
      {renderContent()}
    </main>
  );
};

export default App;
