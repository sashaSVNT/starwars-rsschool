export type CountryType = {
  [countryName: string]: {
    iso_code: string;
    data: CountryData[];
  };
};

export type CountryData = {
  year: number;
  cement_co2: number;
  cumulative_cement_co2: number;
  population?: number;
  [other_attributes: string]: number | undefined;
};
