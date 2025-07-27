import { useEffect, useState } from 'react';
import styles from './peoplePage.module.css';
import { swapiService } from '../../services/swapiService';
import type { PersonResult } from '../../types/personResult.type';
import Search from '../../components/search';
import CardsList from '../../components/cardsList';
import useLocalStorage from '../../utils/useLocalStorage';
import Pagination from '../../components/pagination';
import { useNavigate, useParams } from 'react-router-dom';

export default function PeoplePage() {
  const { page: pageParam = '1', detailsId } = useParams();
  const [people, setPeople] = useState<PersonResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue, saveIntoLS] =
    useLocalStorage('searchValue');
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();
  const currentPage = Math.max(1, parseInt(pageParam) || 1);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await swapiService.getAllPeople(currentPage);
      setPeople(response.results);
      setTotalPages(response.total_pages);
      setIsLoading(false);
    }
    fetchData();
  }, [currentPage]);

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const onSearchSubmit = async () => {
    setIsLoading(true);
    const value = searchValue.trim();
    saveIntoLS(value);
    try {
      let searchPeople;
      if (value === '') {
        const response = await swapiService.getAllPeople(currentPage);
        searchPeople = response.results;
      } else {
        const response = await swapiService.getPeopleByQuery(value);
        searchPeople = response.result;
      }
      onPageChange(1);
      setPeople(searchPeople);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const onPageChange = (newPage: number) => {
    navigate(`/${newPage}${detailsId ? `/${detailsId}` : ''}`);
  };

  return (
    <div className={styles.wrapper}>
      <Search
        onSearchSubmit={onSearchSubmit}
        onSearchChange={onSearchChange}
        searchValue={searchValue}
      />
      <CardsList data={people} isLoading={isLoading} />
      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
