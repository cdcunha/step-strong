'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { ThemeProvider } from './theme-provider';

type AppContextType = {
  currentWeek: number;
  setCurrentWeek: (week: number) => void;
  completedExercises: string[];
  toggleExerciseCompletion: (exerciseId: string) => void;
  weeklyProgress: Record<string, number>;
  completedWeeks: number[];
  markWeekComplete: (weekNumber: number) => void;
  isWeekComplete: (weekNumber: number) => boolean;
  strengtheningSessions: { date: string; week: number }[];
  addStrengtheningSession: (week: number) => void;
  hasReachedWeeklyLimit: (week: number) => boolean;
  resetProgress: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

interface ProvidersProps {
  children: ReactNode;
}

function AppProviders({ children }: ProvidersProps) {
  const [currentWeek, setCurrentWeek] = useLocalStorage('currentWeek', 1);
  const [completedExercises, setCompletedExercises] = useLocalStorage<string[]>(
    'completedExercises',
    []
  );
  const [completedWeeks, setCompletedWeeks] = useLocalStorage<number[]>(
    'completedWeeks',
    []
  );
  const [strengtheningSessions, setStrengtheningSessions] = useLocalStorage<Array<{ date: string; week: number }>>(
    'strengtheningSessions',
    []
  );

  const toggleExerciseCompletion = (exerciseId: string) => {
    setCompletedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    );
    // Track by date for progress streaks
    if (typeof window !== 'undefined') {
      const today = new Date().toISOString().split('T')[0];
      let byDateRaw = localStorage.getItem('completedExercisesByDate');
      let byDate: Record<string, string[]> = {};
      if (byDateRaw) {
        try {
          byDate = JSON.parse(byDateRaw);
        } catch {}
      }
      const ids = new Set(byDate[today] || []);
      if (ids.has(exerciseId)) {
        ids.delete(exerciseId);
      } else {
        ids.add(exerciseId);
      }
      byDate[today] = Array.from(ids);
      // Clean up empty arrays
      if (byDate[today].length === 0) {
        delete byDate[today];
      }
      localStorage.setItem('completedExercisesByDate', JSON.stringify(byDate));
    }
  };

  const markWeekComplete = (weekNumber: number) => {
    if (!completedWeeks.includes(weekNumber)) {
      setCompletedWeeks((prev) => [...prev, weekNumber]);
    }
    if (weekNumber === currentWeek && weekNumber < 5) {
      setCurrentWeek(weekNumber + 1);
    }
  };

  const isWeekComplete = (weekNumber: number) => {
    return completedWeeks.includes(weekNumber);
  };

  const addStrengtheningSession = (week: number) => {
    const today = new Date().toISOString().split('T')[0];
    setStrengtheningSessions((prev) => [...prev, { date: today, week }]);
  };

  const hasReachedWeeklyLimit = (week: number) => {
  // If there are no sessions, the limit can't be reached
  if (strengtheningSessions.length === 0) {
    return false;
  }

  const today = new Date();
  // Set to start of today for accurate comparison
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const sevenDaysAgo = new Date(startOfToday);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Filter sessions for the given week and last 7 days
  const recentSessions = strengtheningSessions.filter(session => {
    if (session.week !== week) return false;
    const sessionDate = new Date(session.date);
    const sessionDay = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());
    return sessionDay >= sevenDaysAgo && sessionDay <= startOfToday;
  });

  // Count unique days
  const uniqueDays = new Set(recentSessions.map(session => session.date)).size;
  return uniqueDays >= 3;
};

  const resetProgress = () => {
    setCurrentWeek(1);
    setCompletedExercises([]);
    setCompletedWeeks([]);
    setStrengtheningSessions([]);
  };

  const weeklyProgress = Array(5).reduce((acc, _, index) => {
    const weekNumber = index + 1;
    const weekExercises = [
      ...(weekNumber <= 2
        ? [
            'week1-1',
            'week1-2',
            'week1-3',
            'week1-4',
          ]
        : weekNumber <= 4
        ? [
            `week3-1`,
            `week3-2`,
            `week3-3`,
            `week3-4`,
          ]
        : [
            'week5-1',
            'week5-2',
            'week5-3',
            'week5-4',
          ]),
    ];
    
    const completedCount = weekExercises.filter((id) =>
      completedExercises.includes(id)
    ).length;
    
    return {
      ...acc,
      [weekNumber]: Math.round((completedCount / weekExercises.length) * 100) || 0,
    };
  }, {} as Record<string, number>);

  return (
    <AppContext.Provider
      value={{
        currentWeek,
        setCurrentWeek,
        completedExercises,
        toggleExerciseCompletion,
        weeklyProgress,
        completedWeeks,
        markWeekComplete,
        isWeekComplete,
        strengtheningSessions,
        addStrengtheningSession,
        hasReachedWeeklyLimit,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="step-strong-theme">
      <AppProviders>{children}</AppProviders>
    </ThemeProvider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a Providers');
  }
  return context;
}
