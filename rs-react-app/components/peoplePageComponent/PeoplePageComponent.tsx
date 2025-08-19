'use client';

import { useState } from 'react';
import styles from './PeoplePageComponent.module.css';
import Search from '@/components/search';
import CardsList from '@/components/cardsList';
import useLocalStorage from '@/utils/useLocalStorage';
import Pagination from '@/components/pagination';
import PersonDetails from '@/components/personDetails';
import SelectedItemsCounter from '@/components/selectedItemsCounter/SelectedItemsCounter';
import { useDispatch, useSelector } from 'react-redux';
import { unselectAllItems } from '@/features/selectedItemSlice/selectedItemSlice';
import type { RootState } from '@/store/store';
import { useGetPeopleQuery } from '@/features/api/api';
import { useRouter } from '@/i18n/routing';

type Props = {
  currentPage: number;
  detailsId?: string;
};

export default function PeoplePageComponent({ currentPage, detailsId }: Props) {
  const [savedValue, setSavedValue] = useLocalStorage('searchValue');
  const [searchValue, setSearchValue] = useState(savedValue);
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, isFetching } = useGetPeopleQuery({
    pageNumber: currentPage,
    searchWord: savedValue,
  });

  const people = data?.results || [];
  const totalPages = data?.totalPages || 1;
  const selectedIds = useSelector(
    (state: RootState) => state.selectedItems.selectedIds
  );

  const onSearchSubmit = async () => {
    const value = searchValue.trim();
    setSavedValue(value);
    router.push('/1');
  };

  const onPageChange = (newPage: number) => {
    router.push(`/${newPage}${detailsId ? `/${detailsId}` : ''}`);
  };

  const onSelectPerson = (id: string) => {
    router.push(`/${currentPage}/${id}`);
  };

  const onCloseDetails = () => {
    router.push(`/${currentPage}`);
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
          isLoading={isFetching}
          onSelectPerson={onSelectPerson}
        />
        {detailsId && (
          <PersonDetails id={detailsId} onCloseDetails={onCloseDetails} />
        )}
      </div>
      {selectedIds.length > 0 && (
        <SelectedItemsCounter
          selectedIds={selectedIds}
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
