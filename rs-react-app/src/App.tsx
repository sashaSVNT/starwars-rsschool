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

function App() {
  const [emissionsData, setEmissionsData] = useState<CountryType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>();
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>(
    SELECTED_FIELDS_BY_DEFAULT
  );
  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmissions();
      if (data) {
        setEmissionsData(data);
        const years = getYears(data);
        setSelectedYear(years[years.length - 1]);
        const fields = getFields(data);
        setAvailableFields(fields);
      }
    };
    fetchData();
  }, []);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleFieldsChange = (fields: string[]) => {
    setSelectedFields(fields);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.controlGroup}>
        <button className={styles.btn} onClick={onOpenModal}>
          Select fields
        </button>
      </div>
      {emissionsData && selectedYear && (
        <CountryList
          data={emissionsData}
          selectedYear={selectedYear}
          selectedFields={selectedFields}
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
