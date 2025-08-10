import type { PersonResult } from './personResult.type';

export type GetPersonByIdResponse = {
  message: string;
  result: PersonResult;
};

export type GetPeopleBySearchWord = {
  message: string;
  total_pages: number;
  results: PersonResult[];
};

export type GetPeopleByLimit = {
  message: string;
  result: PersonResult[];
};

export type GetPeopleResponse = {
  results: PersonResult[];
  totalPages: number;
  isSearch: boolean;
};
