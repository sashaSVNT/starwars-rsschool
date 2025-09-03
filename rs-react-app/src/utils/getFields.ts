import type { CountryType } from '../types';

export const getFields = (data: CountryType) => {
  const fields = new Set<string>();
  Object.values(data).forEach((countryData) => {
    countryData.data.forEach((entry) => {
      Object.keys(entry).forEach((key) => {
        if (key !== 'year') {
          fields.add(key);
        }
      });
    });
  });
  return Array.from(fields);
};
