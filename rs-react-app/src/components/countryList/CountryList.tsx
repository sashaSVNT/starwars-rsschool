import type { CountryType, CountryData } from '../../types';
import styles from './countryList.module.css';

type Props = {
  data: CountryType;
  selectedYear: number;
};

export default function CountryList({ data, selectedYear }: Props) {
  return (
    <div className={styles.countryList}>
      {Object.entries(data).map(([countryName, countryInfo]) => (
        <div key={countryName}>
          <div>
            {countryName}{' '}
            {countryInfo.iso_code && <span>({countryInfo.iso_code})</span>}
          </div>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Population</th>
                <th>CO2</th>
                <th>CO2 per capita</th>
              </tr>
            </thead>
            <tbody>
              {countryInfo.data
                .filter((el) => el.year === selectedYear)
                .map((yearData: CountryData) => (
                  <tr key={yearData.year}>
                    <td>{yearData.year}</td>
                    <td>{yearData.population ?? 'N/A'}</td>
                    <td>{yearData.co2 ?? 'N/A'}</td>
                    <td>{yearData.co2_per_capita ?? 'N/A'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
