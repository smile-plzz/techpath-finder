import { useState, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // Save to local storage.
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

// Quiz-specific storage hooks
export interface QuizProgress {
  currentQuestionIndex: number;
  answers: string[];
  startTime: number;
  lastUpdated: number;
}

export interface QuizResult {
  id: string;
  score: number;
  timestamp: number;
  answers: string[];
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'system';
  quizHistory: QuizResult[];
  bookmarkedSpecializations: string[];
}

export const useQuizProgress = () => {
  const [progress, setProgress] = useLocalStorage<QuizProgress | null>('quiz-progress', null);
  
  const saveProgress = useCallback((questionIndex: number, answers: string[]) => {
    setProgress({
      currentQuestionIndex: questionIndex,
      answers,
      startTime: progress?.startTime || Date.now(),
      lastUpdated: Date.now()
    });
  }, [progress?.startTime, setProgress]);

  const clearProgress = useCallback(() => {
    setProgress(null);
  }, [setProgress]);

  const hasProgress = useCallback(() => {
    return progress !== null && progress.answers.length > 0;
  }, [progress]);

  return {
    progress,
    saveProgress,
    clearProgress,
    hasProgress
  };
};

export const useQuizHistory = () => {
  const [history, setHistory] = useLocalStorage<QuizResult[]>('quiz-history', []);
  
  const addResult = useCallback((result: Omit<QuizResult, 'timestamp'>) => {
    const newResult = { ...result, timestamp: Date.now() };
    setHistory(prev => [newResult, ...prev.slice(0, 9)]); // Keep last 10 results
  }, [setHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return {
    history,
    addResult,
    clearHistory
  };
};

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('user-preferences', {
    theme: 'system',
    quizHistory: [],
    bookmarkedSpecializations: []
  });

  const toggleBookmark = useCallback((specializationId: string) => {
    setPreferences(prev => ({
      ...prev,
      bookmarkedSpecializations: prev.bookmarkedSpecializations.includes(specializationId)
        ? prev.bookmarkedSpecializations.filter(id => id !== specializationId)
        : [...prev.bookmarkedSpecializations, specializationId]
    }));
  }, [setPreferences]);

  const setTheme = useCallback((theme: 'dark' | 'light' | 'system') => {
    setPreferences(prev => ({ ...prev, theme }));
  }, [setPreferences]);

  const isBookmarked = useCallback((specializationId: string) => {
    return preferences.bookmarkedSpecializations.includes(specializationId);
  }, [preferences.bookmarkedSpecializations]);

  return {
    preferences,
    toggleBookmark,
    setTheme,
    isBookmarked
  };
};
