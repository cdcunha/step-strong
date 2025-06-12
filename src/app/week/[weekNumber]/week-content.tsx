'use client';

import { useParams } from 'next/navigation';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ExerciseCard } from '@/components/exercise-card';
import { useAppContext } from '@/components/providers';
import exercisesData from '@/data/exercises.json';

type Exercise = {
  id: string;
  name: string;
  description: string;
  duration?: number;
  sets?: number;
  reps?: string;
  category?: string;
};

type WeekData = {
  weekNumber: number;
  exercises: Exercise[];
};

type StrengtheningProgram = {
  name: string;
  description: string;
  weeks: WeekData[];
};

export function WeekContent() {
  const params = useParams();
  const weekNumber = params?.weekNumber as string;
  const week = parseInt(weekNumber, 10);
  
  const {
    completedExercises,
    toggleExerciseCompletion,
    markWeekComplete,
    isWeekComplete,
    addStrengtheningSession,
    hasReachedWeeklyLimit,
  } = useAppContext();

  if (week < 1 || week > 5) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Week {week} not found. Please select a week between 1 and 5.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const weekData = exercisesData.strengtheningProgram.weeks.find(
    (w: WeekData) => w.weekNumber === week
  );

  if (!weekData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-300">
                Error loading week {week} data.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleStartSession = () => {
    addStrengtheningSession(week);
  };

  const handleMarkWeekComplete = () => {
    markWeekComplete(week);
  };

  // Get the week title and description from the exercises data
  const weekTitle = `Week ${week} Strengthening Program`;
  const weekDescription = `Perform these exercises 3 times per week to build strength and endurance.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Back to home
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          Week {week} Exercises
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Complete all exercises to finish this week's routine.
        </p>
      </div>

      {hasReachedWeeklyLimit(week) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                You've completed the maximum 3 strengthening sessions for this week. 
                Please wait until next week to continue.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {weekData.exercises.map((exercise: Exercise, index: number) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            isCompleted={completedExercises.includes(exercise.id)}
            onCompleteToggle={() => toggleExerciseCompletion(exercise.id)}
            isLast={index === weekData.exercises.length - 1}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={handleStartSession}
            disabled={hasReachedWeeklyLimit(week)}
            className={`w-full flex justify-center px-2 py-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600'
            }`}
          >
            Start Session
          </button>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => markWeekComplete(week)}
            disabled={isWeekComplete(week) || hasReachedWeeklyLimit(week)}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isWeekComplete(week)
                ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600'
                : hasReachedWeeklyLimit(week)
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
          >
            {isWeekComplete(week) ? (
              <>
                <CheckCircleIcon className="mr-2 h-5 w-5" />
                Week {week} Completed
              </>
            ) : hasReachedWeeklyLimit(week) ? (
              'Weekly Limit Reached'
            ) : (
              `Complete Week ${week}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
