'use client';

import Link from 'next/link';
import { useAppContext } from '@/components/providers';
import { CheckCircleIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function HomeContent() {
  const { currentWeek, weeklyProgress, isWeekComplete } = useAppContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12 bg-blue-600 dark:bg-blue-900 p-8 rounded-lg shadow-lg transition-colors duration-200">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Welcome to Step Strong
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100 dark:text-blue-200">
          Your 5-week journey to stronger feet and calves
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Progress</h2>
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((week) => (
            <div key={week} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Week {week} {isWeekComplete(week) && '(Completed)'}
                </h3>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {weeklyProgress[week] || 0}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${weeklyProgress[week] || 0}%` }}
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Link
                  href={`/week/${week}`}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    currentWeek < week && !isWeekComplete(week - 1) && week > 1
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  aria-disabled={
                    currentWeek < week && !isWeekComplete(week - 1) && week > 1
                  }
                >
                  {currentWeek > week || isWeekComplete(week) ? (
                    <>
                      <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" />
                      View Week {week}
                    </>
                  ) : currentWeek === week ? (
                    <>
                      <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5" />
                      Continue Week {week}
                    </>
                  ) : (
                    <>
                      <ClockIcon className="-ml-1 mr-2 h-5 w-5" />
                      Start Week {week}
                    </>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/daily-routine"
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
        >
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Daily Routine</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Perform these exercises daily to improve flexibility and maintain mobility.
            </p>
          </div>
        </Link>
      
        <Link
          href={`/week/${currentWeek}`}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
        >
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Week {currentWeek} Strengthening
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Your current week's strengthening program (3x per week).
            </p>
          </div>
        </Link>
      
        <Link
          href="/progress"
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
        >
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Your Progress</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Track your progress and see how far you've come.
            </p>
          </div>
        </Link>
       </div>
    </div>
  );
}
