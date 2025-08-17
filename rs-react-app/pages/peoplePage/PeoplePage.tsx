import { useEffect, useState } from 'react';
import styles from './peoplePage.module.css';
import Search from '../../components/search';
import CardsList from '../../components/cardsList';
import useLocalStorage from '../../utils/useLocalStorage';
import Pagination from '../../components/pagination';
import { useNavigate, useParams } from 'react-router-dom';
import PersonDetails from '../../components/personDetails';
import SelectedItemsCounter from '../../components/selectedItemsCounter/SelectedItemsCounter';
import { useDispatch, useSelector } from 'react-redux';
import { unselectAllItems } from '../../features/selectedItemReducer/selectedItemReducer';
import type { RootState } from '../../store/store';
import { api, useGetPeopleQuery } from '../../features/api/api';

export default function PeoplePage() {
  const { page: pageParam = '1', detailsId } = useParams();
  const [savedValue, setSavedValue] = useLocalStorage('searchValue');
  const [searchValue, setSearchValue] = useState(savedValue);
  const navigate = useNavigate();
  const currentPage = Math.max(1, parseInt(pageParam));
  const dispatch = useDispatch();
  const { data, isFetching, refetch } = useGetPeopleQuery({
    pageNumber: currentPage,
    searchWord: savedValue,
  });
  const people = data?.results || [];
  const totalPages = data?.totalPages || 1;
  const selectedItemsQuantity = useSelector(
    (state: RootState) => state.selectedItems.selectedIds
  ).length;

  useEffect(() => {
    if (isNaN(currentPage)) {
      navigate('/1');
    }
  }, [currentPage, navigate]);

  const onSearchSubmit = async () => {
    const value = searchValue.trim();
    setSavedValue(value);
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
      <div className={styles.apiBtnGroup}>
        <button className={styles.apiIntegrationBtn} onClick={refetch}>
          refetch
        </button>
        <button
          className={styles.apiIntegrationBtn}
          onClick={() =>
            dispatch(api.util.invalidateTags([{ type: 'People', id: 'LIST' }]))
          }
        >
          list invalidation
        </button>
      </div>
      <div className={styles.masterDetailView}>
        <CardsList
          data={people}
          isLoading={isFetching}
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
      {!isFetching && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
