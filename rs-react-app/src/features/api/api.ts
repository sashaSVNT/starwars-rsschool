import type { PersonAttributes } from '../../types/personResult.type';
import type { GetPersonByIdResponse } from './../../types/apiResponse.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.swapi.tech/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query({
      query: ({ pageNumber, searchWord }) => {
        const limitOfRecords = 7;
        if (searchWord) {
          return `people?name=${searchWord}`;
        }
        return `people?page=${pageNumber}&limit=${limitOfRecords}&expanded=true`;
      },
      transformResponse: (res) => {
        return {
          results: res.result || res.results,
          totalPages: res.total_pages ?? 1,
          onSearch: Boolean(res.results),
        };
      },
    }),
    getPersonById: builder.query<PersonAttributes, string>({
      query: (id) => `people/${id}/`,
      transformResponse: (response: GetPersonByIdResponse) =>
        response.result.properties,
    }),
  }),
});

export const useGetPersonByIdQuery = api.endpoints.getPersonById.useQuery;
