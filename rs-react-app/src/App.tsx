import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './App.module.css';
import { getEmissions } from './utils/getEmissions';
import type { CountryType, SortByField, SortDirection } from './types';
import CountryList from './components/countryList';
import { getYears } from './utils/getYears';
import { getFields } from './utils/getFields';
import Modal from './components/modal';
import SelectAdditionalColumns from './components/selectAdditionalColumns/SelectAdditionalColumns';
import { SELECTED_FIELDS_BY_DEFAULT } from './constants';
import SelectYear from './components/selectYear/SelectYear';
import SearchComponent from './components/searchComponent';
import SelectSortField from './components/selectSortField';

function App() {
  const [emissionsData, setEmissionsData] = useState<CountryType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [previousYear, setPreviousYear] = useState<number>(2023);
  const [years, setYears] = useState<number[]>([]);
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>(
    SELECTED_FIELDS_BY_DEFAULT
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortByField, setSortByField] = useState<SortByField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmissions();
      if (data) {
        setEmissionsData(data);
        const years = getYears(data);
        setYears(years);
        setSelectedYear(years[years.length - 1]);
        const fields = getFields(data);
        setAvailableFields(fields);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {});

  const filteredData = useMemo(() => {
    if (!emissionsData) return;

    if (!searchQuery.trim()) {
      return emissionsData;
    }
    const query = searchQuery.trim().toLowerCase();
    const filteredByQuery: CountryType = {};
    Object.entries(emissionsData).forEach(([countryName, countryInfo]) => {
      if (countryName.toLowerCase().includes(query)) {
        filteredByQuery[countryName] = countryInfo;
      }
    });
    return filteredByQuery;
  }, [searchQuery, emissionsData]);

  const sortedData = useMemo(() => {
    if (!filteredData) return null;

    const entries = Object.entries(filteredData);
    const sortValues = entries.sort(([aName, aInfo], [bName, bInfo]) => {
      let aValue: number | string;
      let bValue: number | string;
      if (sortByField === 'name') {
        aValue = aName;
        bValue = bName;
      } else {
        const aData = aInfo.data.find((el) => el.year === selectedYear);
        const bData = bInfo.data.find((el) => el.year === selectedYear);
        aValue = aData?.population || 0;
        bValue = bData?.population || 0;
      }

      let sortDir = 0;
      if (aValue < bValue) sortDir = -1;
      if (aValue > bValue) sortDir = 1;
      return sortDirection === 'asc' ? sortDir : -sortDir;
    });

    return Object.fromEntries(sortValues);
  }, [filteredData, sortByField, sortDirection]);

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, [isModalOpen]);

  const onOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, [isModalOpen]);

  const handleFieldsChange = useCallback((fields: string[]) => {
    setSelectedFields(fields);
    console.log(fields);
  }, []);

  const onSearchCountry = useCallback(
    (value: string) => {
      setSearchQuery(value);
    },
    [searchQuery]
  );

  const handleYearChange = useCallback(
    (year: number) => {
      setSelectedYear((prevYear) => {
        setPreviousYear(prevYear);
        return year;
      });
    },
    [selectedYear]
  );

  const onSortFieldChange = useCallback(
    (field: SortByField) => {
      setSortByField(field);
    },
    [sortByField]
  );

  const onSortDirectionChange = useCallback(
    (direction: SortDirection) => {
      setSortDirection(direction);
    },
    [sortByField]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.controlGroup}>
        <button className={styles.btn} onClick={onOpenModal}>
          Select fields
        </button>
        <SelectYear
          years={years}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
        <SearchComponent value={searchQuery} onChange={onSearchCountry} />
        <SelectSortField
          sortByField={sortByField}
          sortDirection={sortDirection}
          onSortFieldChange={onSortFieldChange}
          onSortDirectionChange={onSortDirectionChange}
        />
      </div>
      {sortedData && selectedYear && (
        <CountryList
          data={sortedData}
          selectedYear={selectedYear}
          selectedFields={selectedFields}
          previousYear={previousYear}
          sortByField={sortByField}
          sortDirection={sortDirection}
        />
      )}
      {isModalOpen && (
        <Modal onClose={onCloseModal}>
          <SelectAdditionalColumns
            allFields={availableFields}
            selectedFields={selectedFields}
            onFieldsChange={handleFieldsChange}
            onClose={onCloseModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
