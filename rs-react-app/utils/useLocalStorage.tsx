'use client';

import { useState } from 'react';

export default function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = useState(
    localStorage.getItem(key) ?? ''
  );
  const updateValue = (inputValue: string) => {
    localStorage.setItem(key, inputValue);
    setStoredValue(inputValue);
  };

  return [storedValue, updateValue] as const;
}
