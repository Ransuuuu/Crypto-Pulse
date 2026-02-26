import { useState, useEffect } from 'react';

// a simple hook that syncs state with localStorage
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (e) {
      console.error('useLocalStorage read error', e);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('useLocalStorage write error', e);
    }
  }, [key, value]);

  return [value, setValue];
}
