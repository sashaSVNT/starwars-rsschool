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
  const [onSearchMode, setOnSearchMode] = useState(false);
  const [searchValue, setSearchValue, saveIntoLS] =
    useLocalStorage('searchValue');
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const currentPage = Math.max(1, parseInt(pageParam));
  const dispatch = useDispatch();

  const selectedItemsQuantity = useSelector(
    (state: RootState) => state.selectedItems.selectedIds
  ).length;

  const fetchData = async () => {
    setIsLoading(true);
    if (isNaN(currentPage)) {
      navigate('/1');
    } else {
      try {
        const response = await swapiService.getPeople(currentPage, searchValue);
        setPeople(response.results);
        setTotalPages(response.totalPages);
        setOnSearchMode(response.onSearch);
      } catch (error) {
        console.error(error);
        setPeople([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const onSearchSubmit = async () => {
    const value = searchValue.trim();
    saveIntoLS(value);
    fetchData();
    onPageChange(1);
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
      {!isLoading && !onSearchMode && (
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
