import type { CountryType } from '../types';

export async function getEmissions() {
  try {
    const res = await fetch('src/utils/emissions-data.json');
    const data: CountryType = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching emissions data:', error);
    return null;
  }
}
