import type { CountryType } from '../types';
import { transformFieldKey } from './transformFieldKey';

export const getFields = (data: CountryType) => {
  const fields: Record<string, string> = {};
  Object.values(data).forEach((countryData) => {
    countryData.data.forEach((entry) => {
      Object.keys(entry).forEach((key) => {
        if (!fields[key]) {
          fields[key] = transformFieldKey(key);
        }
      });
    });
  });
  return fields;
};
