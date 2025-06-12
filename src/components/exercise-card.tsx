'use client';

import { useState, useEffect } from 'react';
import { CheckCircleIcon, CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

type Exercise = {
  id: string;
  name: string;
  description: string;
  duration?: number;
  sets?: number;
  reps?: string;
  category?: string;
};

type ExerciseCardProps = {
  exercise: Exercise;
  isCompleted: boolean;
  onCompleteToggle: () => void;
  isLast?: boolean;
  showCompleteButton?: boolean;
  autoStart?: boolean;
  onComplete?: () => void;
};

export function ExerciseCard({
  exercise,
  isCompleted,
  onCompleteToggle,
  isLast = false,
  showCompleteButton = true,
  autoStart = false,
  onComplete,
}: ExerciseCardProps) {
  const [timeLeft, setTimeLeft] = useState(exercise.duration || 0);
  const [isActive, setIsActive] = useState(autoStart);
  const [showDescription, setShowDescription] = useState(false);
  const [beepSound, setBeepSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load the beep sound
    setBeepSound(new Audio('/beep-5s.wav'));
  }, []);

  useEffect(() => {
    if (beepSound && isActive && timeLeft <= 4 && timeLeft > 0) {
      beepSound.currentTime = 0; // Reset audio to start
      beepSound.play().catch(e => console.error('Error playing sound:', e));
    }
  }, [timeLeft, isActive, beepSound]);

  useEffect(() => {
    if (!exercise.duration) return;
    
    setTimeLeft(exercise.duration);
  }, [exercise.duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      if (onComplete) onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
      // Clean up audio
      if (beepSound) {
        beepSound.pause();
        beepSound.currentTime = 0;
      }
    };
  }, [isActive, timeLeft, onComplete, beepSound]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(exercise.duration || 0);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(exercise.duration || 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        overflow-hidden shadow rounded-lg 
        transition-colors duration-200
        ${isCompleted ? 'ring-2 ring-green-500' : ''}
      `}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {exercise.name}
              {isCompleted && (
                <CheckCircleIconSolid className="inline-block ml-2 h-5 w-5 text-green-500" />
              )}
            </h3>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-300 space-y-1">
              {exercise.sets && (
                <div className="flex items-center">
                  <span className="font-medium text-gray-900 dark:text-gray-300">Sets:</span>
                  <span className="ml-2">{exercise.sets}</span>
                </div>
              )}
              {exercise.reps && <div>Reps: {exercise.reps}</div>}
              {exercise.duration && (
                <div className="flex items-center">
                  <span className="mr-2 font-medium text-gray-900 dark:text-gray-300">Duration:</span>
                  <span className="font-mono font-medium text-gray-900 dark:text-gray-300">
                    {formatTime(timeLeft)}
                  </span>
                  <button
                    onClick={toggleTimer}
                    className="ml-2 p-1 text-blue-600 hover:text-blue-800"
                    aria-label={isActive ? 'Pause' : 'Start'}
                  >
                    {isActive ? (
                      <PauseIcon className="h-5 w-5" />
                    ) : (
                      <PlayIcon className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    aria-label="Reset"
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          {showCompleteButton && (
            <button
              onClick={onCompleteToggle}
              className={`ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm ${
                isCompleted
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isCompleted ? 'Completed' : 'Mark Complete'}
            </button>
          )}
        </div>

        {exercise.description && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowDescription(!showDescription)}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
            >
              {showDescription ? 'Hide instructions' : 'Show instructions'}
            </button>
            {showDescription && (
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                {exercise.description.split('\n').map((line, i) => (
                  <p key={i} className="mb-2">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
