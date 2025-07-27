import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { swapiService } from './services/swapiService';
import type { PersonResult } from './types/personResult.type';
import Search from './components/search';
import CardsList from './components/cardsList';

export default function App() {
  const [people, setPeople] = useState<PersonResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem('searchValue') ?? ''
  );

  useEffect(() => {
    async function fetchData() {
      const response = await swapiService.getAllPeople(searchValue);
      setPeople(response);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const onSearchSubmit = async () => {
    setIsLoading(true);
    const value = searchValue.trim();
    localStorage.setItem('searchValue', value);
    try {
      const response = await swapiService.getAllPeople(value);
      setPeople(response);
      setSearchValue(value);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <Search
        onSearchSubmit={onSearchSubmit}
        onSearchChange={onSearchChange}
        searchValue={searchValue}
      />
      <CardsList data={people} isLoading={isLoading} />
    </div>
  );
}
