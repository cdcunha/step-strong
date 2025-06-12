'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { ExerciseCard } from '@/components/exercise-card';
import exercisesData from '@/data/exercises.json';
import { useAppContext } from '@/components/providers';

type TabType = 'morning' | 'evening';

export default function DailyRoutinePage() {
  const [activeTab, setActiveTab] = useState<TabType>('morning');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isRoutineActive, setIsRoutineActive] = useState(false);
  
  const { completedExercises, toggleExerciseCompletion } = useAppContext();

  const exercises = activeTab === 'morning' 
    ? exercisesData.dailyRoutine.morning 
    : exercisesData.dailyRoutine.evening;

  const handleExerciseComplete = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      setIsRoutineActive(false);
    }
  };

  const startRoutine = () => {
    setCurrentExerciseIndex(0);
    setIsRoutineActive(true);
  };

  const currentExercise = exercises[currentExerciseIndex];
  const progress = Math.round(((currentExerciseIndex) / exercises.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
          Daily Routine
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Perform these exercises daily to improve flexibility and maintain mobility.
        </p>
      </div>

      {!isRoutineActive ? (
        <>
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['morning', 'evening'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as TabType)}
                    className={`${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                  >
                    {tab} Routine
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isCompleted={completedExercises.includes(exercise.id)}
                onCompleteToggle={() => toggleExerciseCompletion(exercise.id)}
                showCompleteButton={true}
              />
            ))}
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={startRoutine}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Routine
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {activeTab === 'morning' ? 'Morning' : 'Evening'} Routine
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Exercise {currentExerciseIndex + 1} of {exercises.length}
            </p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <ExerciseCard
              exercise={currentExercise}
              isCompleted={completedExercises.includes(currentExercise.id)}
              onCompleteToggle={() => toggleExerciseCompletion(currentExercise.id)}
              autoStart={true}
              onComplete={handleExerciseComplete}
            />
            
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => {
                  if (currentExerciseIndex > 0) {
                    setCurrentExerciseIndex(currentExerciseIndex - 1);
                  }
                }}
                disabled={currentExerciseIndex === 0}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  currentExerciseIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Previous
              </button>
              
              <button
                type="button"
                onClick={() => {
                  if (currentExerciseIndex < exercises.length - 1) {
                    setCurrentExerciseIndex(currentExerciseIndex + 1);
                  } else {
                    setIsRoutineActive(false);
                  }
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {currentExerciseIndex < exercises.length - 1 ? 'Next Exercise' : 'Finish Routine'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
