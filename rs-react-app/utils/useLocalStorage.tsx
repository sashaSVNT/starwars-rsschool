'use client';

import { useEffect, useState } from 'react';

export default function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = useState('');

  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value) {
      setStoredValue(value);
    }
  }, [key]);
  const updateValue = (inputValue: string) => {
    localStorage.setItem(key, inputValue);
    setStoredValue(inputValue);
  };

  return [storedValue, updateValue] as const;
}
