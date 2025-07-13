import type { ApiResponse } from '../types/apiResponse.type';
// import type { Person } from '../types/person.type';

class SwapiService {
  private basePath = 'https://www.swapi.tech/api/';
  private limitOfRecords = 7;

  private getResource = async (url: string) => {
    const res = await fetch(`${this.basePath}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`);
    }

    return await res.json();
  };

  public getAllPeople = async (page: number) => {
    const res: ApiResponse = await this.getResource(
      `/people?page=${page}&limit=${this.limitOfRecords}&expanded=true`
    );
    return res.results;
  };
}

export const swapiService = new SwapiService();
