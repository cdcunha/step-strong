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
  // Set tracking
  const totalSets = exercise.sets ?? 1;
  const [currentSet, setCurrentSet] = useState(1);
  // Adjustable timer for Tennis Ball Roll or rep range
  const isTennisBallRoll = exercise.name?.toLowerCase().includes('tennis ball roll') || (exercise.reps && exercise.reps.includes('1-2'));
  const [customDuration, setCustomDuration] = useState<number>(exercise.duration || 60);
  const [timeLeft, setTimeLeft] = useState(exercise.duration || 0);
  const [isActive, setIsActive] = useState(autoStart);
  const [showDescription, setShowDescription] = useState(false);
  // Use refs for audio to avoid unnecessary re-renders
  const beepRef = useRef<HTMLAudioElement | null>(null);
  const finalBeepRef = useRef<HTMLAudioElement | null>(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // Track if short or final beep is playing
  const isPlayingShortBeep = useRef(false);
  const isPlayingFinalBeep = useRef(false);

  // Preload audio only once
  useEffect(() => {
    beepRef.current = new Audio('/short-beep.mp3');
    beepRef.current.preload = 'auto';
    // Listen for short beep end to reset flag
    beepRef.current.addEventListener('ended', () => {
      isPlayingShortBeep.current = false;
      beepRef.current!.currentTime = 0;
    });
    // For the long beep at 0s
    finalBeepRef.current = new Audio('/final-bell.mp3');
    finalBeepRef.current.preload = 'auto';
    // Listen for final bell end to reset flag
    finalBeepRef.current.addEventListener('ended', () => {
      isPlayingFinalBeep.current = false;
      finalBeepRef.current!.currentTime = 0;
    });
    return () => {
      beepRef.current?.removeEventListener('ended', () => {
        isPlayingShortBeep.current = false;
        beepRef.current!.currentTime = 0;
      });
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
      if (beepRef.current) {
        beepRef.current.currentTime = 0;
        isPlayingShortBeep.current = true;
        beepRef.current.play().catch(e => {
          isPlayingShortBeep.current = false;
          console.error('Error playing beep:', e);
        });
      }
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

  // If Tennis Ball Roll or rep range, use custom duration
  useEffect(() => {
    if (isTennisBallRoll) {
      setTimeLeft(customDuration);
    } else if (exercise.duration) {
      setTimeLeft(exercise.duration);
    }
  }, [exercise.duration, customDuration, isTennisBallRoll]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      // If multi-set, advance set or finish
      if (totalSets > 1 && currentSet < totalSets) {
        setTimeout(() => {
          setCurrentSet((set) => set + 1);
          setTimeLeft(isTennisBallRoll ? customDuration : (exercise.duration || 0));
          setIsActive(false);
        }, 1000); // 1s pause before next set
      } else {
        if (onComplete) onComplete();
      }
    }

    return () => {
      if (interval) clearInterval(interval);
      // Clean up audio
      // Only pause/reset short beep if not currently playing
      if (!isPlayingShortBeep.current) {
        beepRef.current?.pause();
        if (beepRef.current) beepRef.current.currentTime = 0;
      }
      // Only pause/reset final bell if not currently playing
      if (!isPlayingFinalBeep.current) {
        finalBeepRef.current?.pause();
        if (finalBeepRef.current) finalBeepRef.current.currentTime = 0;
      }
    };
  }, [isActive, timeLeft, onComplete, totalSets, currentSet, customDuration, isTennisBallRoll, exercise.duration]);

  const toggleTimer = () => {
    unlockAudio();
    if (timeLeft === 0) {
      setTimeLeft(isTennisBallRoll ? customDuration : (exercise.duration || 0));
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    unlockAudio();
    setIsActive(false);
    setTimeLeft(isTennisBallRoll ? customDuration : (exercise.duration || 0));
  };

  // For multi-set exercises: manually go to next set
  const nextSet = () => {
    if (currentSet < totalSets) {
      setCurrentSet(currentSet + 1);
      setTimeLeft(isTennisBallRoll ? customDuration : (exercise.duration || 0));
      setIsActive(false);
    }
  };
  // For multi-set exercises: manually go to previous set
  const prevSet = () => {
    if (currentSet > 1) {
      setCurrentSet(currentSet - 1);
      setTimeLeft(isTennisBallRoll ? customDuration : (exercise.duration || 0));
      setIsActive(false);
    }
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
              {totalSets > 1 && (
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-gray-300">Set:</span>
                  <span className="font-bold">{currentSet}</span>
                  <span className="text-gray-400">/ {totalSets}</span>
                  <button
                    onClick={prevSet}
                    disabled={currentSet === 1}
                    className="ml-2 px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-200 disabled:opacity-50"
                    aria-label="Previous Set"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={nextSet}
                    disabled={currentSet === totalSets}
                    className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-200 disabled:opacity-50"
                    aria-label="Next Set"
                  >
                    &gt;
                  </button>
                </div>
              )}
              {exercise.reps && <div>Reps: {exercise.reps}</div>}
              {(exercise.duration || isTennisBallRoll) && (
                <div className="flex items-center space-x-2">
                  <span className="mr-2 font-medium text-gray-900 dark:text-gray-300">Duration:</span>
                  {/* Adjustable timer for Tennis Ball Roll or rep range */}
                  {isTennisBallRoll && !isActive && (
                    <select
                      value={customDuration}
                      onChange={e => setCustomDuration(Number(e.target.value))}
                      className="mr-2 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      aria-label="Set timer duration"
                    >
                      <option value={60}>1 minute</option>
                      <option value={90}>1.5 minutes</option>
                      <option value={120}>2 minutes</option>
                    </select>
                  )}
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
                  : (totalSets > 1 && currentSet < totalSets)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={totalSets > 1 && currentSet < totalSets}
            >
              {isCompleted
                ? 'Completed'
                : (totalSets > 1 && currentSet < totalSets)
                  ? `Complete all sets to finish`
                  : 'Mark Complete'}
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
