import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { getEmissions } from './utils/getEmissions';
import type { CountryType } from './types';
import CountryList from './components/countryList';
import { getYears } from './utils/getYears';
import { getFields } from './utils/getFields';
import Modal from './components/modal';
import SelectAdditionalColumns from './components/selectAdditionalColumns/SelectAdditionalColumns';
import { SELECTED_FIELDS_BY_DEFAULT } from './constants';
import SelectYear from './components/selectYear/SelectYear';
import SearchComponent from './components/searchComponent';

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
  const [filteredData, setFilteredData] = useState<CountryType | null>(null);

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
        setFilteredData(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!emissionsData) return;

    if (!searchQuery.trim()) {
      setFilteredData(emissionsData);
      return;
    }
    const query = searchQuery.trim().toLowerCase();
    const filteredByQuery: CountryType = {};
    Object.entries(emissionsData).forEach(([countryName, countryInfo]) => {
      if (countryName.toLowerCase().includes(query)) {
        filteredByQuery[countryName] = countryInfo;
      }
    });
    setFilteredData(filteredByQuery);
  }, [searchQuery, emissionsData]);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleFieldsChange = (fields: string[]) => {
    setSelectedFields(fields);
  };

  const onSearchCountry = (value: string) => {
    setSearchQuery(value);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear((prevYear) => {
      setPreviousYear(prevYear);
      return year;
    });
  };

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
      </div>
      {filteredData && selectedYear && (
        <CountryList
          data={filteredData}
          selectedYear={selectedYear}
          selectedFields={selectedFields}
          previousYear={previousYear}
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
