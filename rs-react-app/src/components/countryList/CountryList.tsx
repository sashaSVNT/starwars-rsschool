import type { CountryType, CountryData } from '../../types';
import styles from './countryList.module.css';
import { getFieldLabel } from '../../utils/getFieldLabel';
import { useEffect, useState } from 'react';

type Props = {
  data: CountryType;
  selectedYear: number;
  previousYear: number;
  selectedFields: string[];
};

export default function CountryList({
  data,
  selectedYear,
  selectedFields,
  previousYear,
}: Props) {
  const [highlightedValues, setHighlightedValues] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    const newHighlightedValues: Record<string, string[]> = {};
    Object.entries(data).forEach(([countryName, countryInfo]) => {
      const previousData = countryInfo.data.find(
        (el) => el.year === previousYear
      );
      const currentData = countryInfo.data.find(
        (el) => el.year === selectedYear
      );

      if (previousData && currentData) {
        const changedValues: string[] = [];
        selectedFields.forEach((el) => {
          const previousValue = previousData[el as keyof CountryData];
          const currentValue = currentData[el as keyof CountryData];
          if (currentValue !== previousValue) {
            changedValues.push(el);
          }
          if (changedValues.length > 0) {
            newHighlightedValues[countryName] = changedValues;
          }
        });
      }
    });
    setHighlightedValues(newHighlightedValues);
  }, [data, selectedYear, previousYear]);

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
                  {selectedFields.map((field) => {
                    const isHighlighted =
                      highlightedValues[countryName]?.includes(field);
                    return (
                      <td
                        key={field}
                        className={
                          isHighlighted ? styles.isHighlighted : undefined
                        }
                      >
                        {formatEmissionValue(
                          yearData[field as keyof CountryData]
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
