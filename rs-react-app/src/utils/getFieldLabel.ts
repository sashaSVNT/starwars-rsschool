import type { SortDirection } from './../types/index';
export const getFieldLabel = (key: string) => {
  return key.split('_').join(' ');
};

export const getSortedFieldLabel = (
  key: string,
  isSorted: boolean,
  sortDirection: SortDirection
) => {
  const fieldLabel = getFieldLabel(key);
  return isSorted
    ? `${fieldLabel} ${sortDirection === 'asc' ? '▲' : '▼'}`
    : fieldLabel;
};
