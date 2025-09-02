import type { CountryType } from '../types';

export async function getEmissions() {
  try {
    const res = await fetch(
      'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    );
    const data: CountryType = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching emissions data:', error);
    return null;
  }
}

// src/utils/emissions-data.json
// https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json
