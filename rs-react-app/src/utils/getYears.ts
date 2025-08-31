import type { CountryType } from '../types';

export const getYears = (data: CountryType) => {
  const years = new Set<number>();
  Object.values(data).forEach(({ data: dataByYear }) => {
    dataByYear.forEach((el) => years.add(el.year));
  });
  const yearsArray = Array.from(years);
  return yearsArray;
};
