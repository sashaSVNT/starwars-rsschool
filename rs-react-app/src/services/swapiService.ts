import type {
  GetAllPeopleResponse,
  GetPeopleByQueryResponse,
} from '../types/apiResponse.type';
// import type { Person } from '../types/person.type';

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

  public getAllPeople = async (pageNumber: number) => {
    const searchQuery = `people?page=${pageNumber}&limit=${this.limitOfRecords}&expanded=true`;
    const res: GetAllPeopleResponse = await this.getResource(searchQuery);
    console.log(res);
    if (res.message === 'ok') {
      return res;
    } else {
      throw new Error(`${res.message}`);
    }
  };

  public getPeopleByQuery = async (searchWord: string) => {
    const searchQuery = `people?name=${searchWord}`;
    const res: GetPeopleByQueryResponse = await this.getResource(searchQuery);
    if (res.message === 'ok') {
      return res;
    } else {
      throw new Error(`${res.message}`);
    }
  };
}

export const swapiService = new SwapiService();
