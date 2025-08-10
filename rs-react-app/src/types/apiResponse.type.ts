import type { PersonResult } from './personResult.type';

export type GetPersonByIdResponse = {
  message: string;
  result: PersonResult;
};

export type GetPeopleResponse = {
  results: PersonResult[];
  totalPages: number;
  isSearch: boolean;
};
