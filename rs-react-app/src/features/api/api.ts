import type { PersonAttributes } from '../../types/personResult.type';
import type {
  GetPeopleByLimit,
  GetPeopleBySearchWord,
  GetPeopleResponse,
  GetPersonByIdResponse,
} from './../../types/apiResponse.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type GetPeopleArgs = {
  pageNumber: number;
  searchWord?: string;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.swapi.tech/api/' }),
  tagTypes: ['People'],
  endpoints: (builder) => ({
    getPeople: builder.query<GetPeopleResponse, GetPeopleArgs>({
      query: ({ pageNumber, searchWord }) => {
        const limitOfRecords = 7;
        if (searchWord) {
          return `people?name=${searchWord}`;
        }
        return `people?page=${pageNumber}&limit=${limitOfRecords}&expanded=true`;
      },
      transformResponse: (
        res: GetPeopleBySearchWord | GetPeopleByLimit
      ): GetPeopleResponse => {
        if ('result' in res) {
          return {
            results: res.result,
            totalPages: 1,
          };
        }
        return {
          results: res.results,
          totalPages: res.total_pages,
        };
      },
      providesTags: [{ type: 'People', id: 'LIST' }],
    }),
    getPersonById: builder.query<PersonAttributes, string>({
      query: (id) => `people/${id}/`,
      transformResponse: (response: GetPersonByIdResponse) =>
        response.result.properties,
      providesTags: (result, error, id) => [{ type: 'People', id }],
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonByIdQuery } = api;
