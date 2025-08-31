import type { CountryType, CountryData } from '../../types';
import styles from './countryList.module.css';
import { getFieldLabel } from '../../utils/getFieldLabel';

type Props = {
  data: CountryType;
  selectedYear: number;
  selectedFields: string[];
};

export default function CountryList({
  data,
  selectedYear,
  selectedFields,
}: Props) {
  const formatEmissionValue = (value: number | undefined): string => {
    if (!value) return 'N/A';
    return String(Math.round(value * 100) / 100);
  };

  return (
    <div className={styles.countryList}>
      {Object.entries(data).map(([countryName, countryInfo]) => {
        const yearData = countryInfo.data.find(
          (item) => item.year === selectedYear
        );
        if (!yearData) {
          return;
        }

        return (
          <div key={countryName}>
            <div className={styles.countryHeader}>
              <h3>{countryName}</h3>
              {countryInfo.iso_code && <span>({countryInfo.iso_code})</span>}
            </div>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {selectedFields.map((field) => (
                    <th key={field}>{getFieldLabel(field)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {selectedFields.map((field) => (
                    <td key={field}>
                      {formatEmissionValue(
                        yearData[field as keyof CountryData]
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
