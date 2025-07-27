import type { PersonResult } from './personResult.type';

export type GetAllPeopleResponse = {
  message: string;
  next: string;
  previous: string;
  results: PersonResult[];
  total_pages: number;
};

export type GetPeopleByQueryResponse = {
  message: string;
  result: PersonResult[];
};
