import type { PersonResult } from './personResult.type';

export type ApiResponse = {
  message: string;
  next: string;
  previous: string;
  results?: PersonResult[];
  result?: PersonResult[];
};
