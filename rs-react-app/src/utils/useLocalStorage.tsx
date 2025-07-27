export default function useLocalStorage(key: string) {
  const storedValue = localStorage.getItem(key) ?? '';
  const updateValue = (inputValue: string) => {
    localStorage.setItem(key, inputValue);
  };

  return [storedValue, updateValue] as const;
}
