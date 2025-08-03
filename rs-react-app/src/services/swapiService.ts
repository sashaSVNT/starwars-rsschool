import type { GetPersonByIdResponse } from '../types/apiResponse.type';

class SwapiService {
  private basePath = 'https://www.swapi.tech/api/';
  private limitOfRecords = 7;

  private getResource = async (url: string) => {
    const res = await fetch(`${this.basePath}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`);
    }

    return res.json();
  };

  public getPeople = async (pageNumber: number, searchWord: string = '') => {
    const searchQuery = searchWord
      ? `people?name=${searchWord}`
      : `people?page=${pageNumber}&limit=${this.limitOfRecords}&expanded=true`;

    const res = await this.getResource(searchQuery);
    if (res.message !== 'ok') {
      throw new Error(res.message);
    }

    return {
      results: res.result || res.results,
      totalPages: searchWord ? 1 : res.total_pages,
      onSearch: Boolean(searchWord),
    };
  };

  public getPersonById = async (id: string) => {
    const searchQuery = `people/${id}/`;
    const res: GetPersonByIdResponse = await this.getResource(searchQuery);
    if (res.message === 'ok') {
      return res;
    } else {
      throw new Error(`${res.message}`);
    }
  };
}

export const swapiService = new SwapiService();
