'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, TrophyIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useAppContext } from '@/components/providers';
import exercisesData from '@/data/exercises.json';

const calculateStreak = (dates: string[]): number => {
  if (dates.length === 0) return 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const uniqueDates = [...new Set(dates)].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  let streak = 0;
  let currentDate = new Date(today);
  
  for (let i = 0; i < uniqueDates.length; i++) {
    const date = new Date(uniqueDates[i]);
    date.setHours(0, 0, 0, 0);
    
    if (date.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (date < currentDate) {
      // If there's a gap, break the streak
      break;
    }
  }
  
  return streak;
};

export default function ProgressPage() {
  const {
    completedExercises,
    weeklyProgress,
    completedWeeks,
    strengtheningSessions,
    resetProgress,
  } = useAppContext();
  
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  const totalExercises = exercisesData.strengtheningProgram.weeks.reduce(
    (total, week) => total + week.exercises.length,
    0
  );
  
  const completedStrengtheningSessions = strengtheningSessions.length;
  const sessionDates = [...new Set(strengtheningSessions.map(s => s.date))];
  // Patch: Calculate unique days where any exercise was completed
  const getCompletedDays = () => {
    // Try to read from localStorage directly, since completedExercises is only IDs
    // Assume you use a localStorage key like 'completedExercisesByDate' in your app
    if (typeof window !== 'undefined') {
      try {
        const byDateRaw = localStorage.getItem('completedExercisesByDate');
        if (byDateRaw) {
          const byDate = JSON.parse(byDateRaw); // { [date]: [ids] }
          return Object.keys(byDate).length;
        }
      } catch (e) {}
    }
    // fallback: 0
    return 0;
  };
  const daysCompleted = getCompletedDays();
  
  const totalPossibleSessions = 3 * 5; // 3 sessions per week for 5 weeks
  const completionPercentage = Math.round(
    (completedStrengtheningSessions / totalPossibleSessions) * 100
  );

  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-block mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          ← Back to Home
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">Your Progress</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Track your journey to stronger feet and calves
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <TrophyIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                    Current Streak
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {daysCompleted}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600 dark:text-green-400">
                      days
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                    Sessions Completed
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {completedStrengtheningSessions}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600 dark:text-green-400">
                      / {totalPossibleSessions}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <ChartBarIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                    Program Completion
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {completionPercentage}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8 transition-colors duration-200">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Weekly Progress
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
            Your completion rate for each week of the program
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((week) => (
              <div key={week} className="mb-4">
                <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <span>Week {week}</span>
                  <span>{weeklyProgress[week] || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${weeklyProgress[week] || 0}%` }}
                  />
                </div>
                {completedWeeks.includes(week) && (
                  <div className="mt-1 text-sm text-green-600 dark:text-green-400 font-medium">
                    Week completed! 🎉
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg transition-colors duration-200">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Reset Progress
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-300">
            <p>
              This will reset all your progress, including completed exercises and
              sessions. This action cannot be undone.
            </p>
          </div>
          <div className="mt-5">
            {showResetConfirm ? (
              <div className="space-x-3">
                <button
                  type="button"
                  onClick={handleResetProgress}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 dark:text-red-100 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm transition-colors"
                >
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Reset All Progress
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
