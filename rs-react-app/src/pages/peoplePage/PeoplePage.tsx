import { useEffect, useState } from 'react';
import styles from './peoplePage.module.css';
import { swapiService } from '../../services/swapiService';
import type { PersonResult } from '../../types/personResult.type';
import Search from '../../components/search';
import CardsList from '../../components/cardsList';
import useLocalStorage from '../../utils/useLocalStorage';
import Pagination from '../../components/pagination';
import { useNavigate, useParams } from 'react-router-dom';
import PersonDetails from '../../components/personDetails';
import SelectedItemsCounter from '../../components/selectedItemsCounter/SelectedItemsCounter';
import { useDispatch, useSelector } from 'react-redux';
import { unselectAllItems } from '../../features/selectedItemReducer';
import type { RootState } from '../../app/store';

export default function PeoplePage() {
  const { page: pageParam = '1', detailsId } = useParams();
  const [people, setPeople] = useState<PersonResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue, saveIntoLS] =
    useLocalStorage('searchValue');
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const currentPage = Math.max(1, parseInt(pageParam) || 1);
  const dispatch = useDispatch();

  const selectedItemsQuantity = useSelector(
    (state: RootState) => state.selectedItems.selectedIds
  ).length;

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

  const onSelectPerson = (id: string) => {
    navigate(`/${currentPage}/${id}`);
  };

  const onCloseDetails = () => {
    navigate(`/${currentPage}`);
  };

  const unselectAll = () => {
    dispatch(unselectAllItems());
  };

  return (
    <div className={styles.wrapper}>
      <Search
        onSearchSubmit={onSearchSubmit}
        onSearchChange={setSearchValue}
        searchValue={searchValue}
      />
      <div className={styles.masterDetailView}>
        <CardsList
          data={people}
          isLoading={isLoading}
          onSelectPerson={onSelectPerson}
        />
        {detailsId && (
          <PersonDetails id={detailsId} onCloseDetails={onCloseDetails} />
        )}
      </div>
      {selectedItemsQuantity > 0 && (
        <SelectedItemsCounter
          quantity={selectedItemsQuantity}
          unselectAll={unselectAll}
        />
      )}
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
