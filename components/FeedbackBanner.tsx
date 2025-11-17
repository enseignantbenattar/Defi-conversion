
import React from 'react';
import type { Unit } from '../types';

interface FeedbackBannerProps {
  isCorrect: boolean | null;
  correctAnswer: number;
  unit: Unit;
}

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({ isCorrect, correctAnswer, unit }) => {
  if (isCorrect === null) {
    return <div className="h-16"></div>;
  }

  const baseClasses = "flex items-center justify-center p-4 rounded-lg my-4 text-white font-semibold transition-all duration-300 ease-in-out transform";
  const correctClasses = "bg-green-500";
  const incorrectClasses = "bg-red-500";
  
  return (
    <div className={`h-16 ${isCorrect ? 'opacity-100 scale-100' : 'opacity-100 scale-100'}`}>
      {isCorrect ? (
        <div className={`${baseClasses} ${correctClasses}`}>
          <CheckIcon />
          <span>Bravo, c'est la bonne réponse !</span>
        </div>
      ) : (
        <div className={`${baseClasses} ${incorrectClasses}`}>
          <XIcon />
          <span>Incorrect. La réponse était : {correctAnswer} {unit}</span>
        </div>
      )}
    </div>
  );
};
   