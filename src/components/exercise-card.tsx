'use client';

import { useState, useEffect, useRef } from 'react';
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
  // Use refs for audio to avoid unnecessary re-renders
  const beepRef = useRef<HTMLAudioElement | null>(null);
  const finalBeepRef = useRef<HTMLAudioElement | null>(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // Track if final bell is playing
  const isPlayingFinalBeep = useRef(false);

  // Preload audio only once
  useEffect(() => {
    beepRef.current = new Audio('/short-beep.mp3');
    beepRef.current.preload = 'auto';
    // For the long beep at 0s
    finalBeepRef.current = new Audio('/final-bell.mp3');
    finalBeepRef.current.preload = 'auto';
    // Listen for final bell end to reset flag
    finalBeepRef.current.addEventListener('ended', () => {
      isPlayingFinalBeep.current = false;
      finalBeepRef.current!.currentTime = 0;
    });
    return () => {
      finalBeepRef.current?.removeEventListener('ended', () => {
        isPlayingFinalBeep.current = false;
        finalBeepRef.current!.currentTime = 0;
      });
    };
  }, []);

  // Unlock audio on first user interaction (iOS/Safari fix)
  const unlockAudio = () => {
    if (!audioUnlocked) {
      beepRef.current?.play().then(() => {
        beepRef.current?.pause();
        beepRef.current!.currentTime = 0;
      }).catch(() => {});
      finalBeepRef.current?.play().then(() => {
        finalBeepRef.current?.pause();
        finalBeepRef.current!.currentTime = 0;
      }).catch(() => {});
      setAudioUnlocked(true);
    }
  };

  // Play beep at 5,4,3,2,1; long beep at 0
  useEffect(() => {
    if (!isActive) return;
    if (!audioUnlocked) return;
    if (timeLeft <= 5 && timeLeft > 0) {
      beepRef.current && beepRef.current.currentTime !== undefined && (beepRef.current.currentTime = 0);
      beepRef.current?.play().catch(e => console.error('Error playing beep:', e));
    } else if (timeLeft === 0) {
      if (finalBeepRef.current) {
        finalBeepRef.current.currentTime = 0;
        isPlayingFinalBeep.current = true;
        finalBeepRef.current.play().catch(e => {
          isPlayingFinalBeep.current = false;
          console.error('Error playing final beep:', e);
        });
      }
    }
  }, [timeLeft, isActive, audioUnlocked]);

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
      beepRef.current?.pause();
      if (beepRef.current) beepRef.current.currentTime = 0;
      // Only pause/reset final bell if not currently playing
      if (!isPlayingFinalBeep.current) {
        finalBeepRef.current?.pause();
        if (finalBeepRef.current) finalBeepRef.current.currentTime = 0;
      }
    };
  }, [isActive, timeLeft, onComplete]);

  const toggleTimer = () => {
    unlockAudio();
    if (timeLeft === 0) {
      setTimeLeft(exercise.duration || 0);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    unlockAudio();
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
                  <span className="font-mono font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-gray-100 tracking-widest px-2">
                    {formatTime(timeLeft)}
                  </span>
                  <button
                    onClick={toggleTimer}
                    className="ml-2 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    style={{ minWidth: 48, minHeight: 48 }}
                    aria-label={isActive ? 'Pause' : 'Start'}
                  >
                    {isActive ? (
                      <PauseIcon className="h-7 w-7" />
                    ) : (
                      <PlayIcon className="h-7 w-7" />
                    )}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="ml-2 p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    style={{ minWidth: 48, minHeight: 48 }}
                    aria-label="Reset"
                  >
                    <ArrowPathIcon className="h-6 w-6" />
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
