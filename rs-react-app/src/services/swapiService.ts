import type { ApiResponse } from '../types/apiResponse.type';
// import type { Person } from '../types/person.type';

class SwapiService {
  private basePath = 'https://www.swapi.tech/api/';
  private limitOfRecords = 8;

  private getResource = async (url: string) => {
    const res = await fetch(`${this.basePath}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`);
    }

    return await res.json();
  };

  public getAllPeople = async (searchWord: string) => {
    const searchQuery = searchWord
      ? `people?name=${encodeURIComponent(searchWord)}&page=1&limit=${this.limitOfRecords}&expanded=true`
      : `people?page=1&limit=${this.limitOfRecords}&expanded=true`;
    const res: ApiResponse = await this.getResource(searchQuery);
    console.log(res);
    if (res.results) {
      return res.results;
    } else if (res.result) {
      return res.result;
    } else {
      return [];
    }
  };
}

export const swapiService = new SwapiService();
