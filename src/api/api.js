import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Heroes'],
  endpoints: (build) => ({
    getHeroes: build.query({
      query: () => 'heroes',
      providesTags: ['Heroes'],
    }),
    deleteHero: build.mutation({
      query: (id) => ({
        url: `heroes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Heroes'],
    }),
    addHero: build.mutation({
      query: (hero) => ({
        url: `heroes/`,
        method: 'POST',
        body: hero,
      }),
      invalidatesTags: ['Heroes'],
    }),
    getFilters: build.query({
      query: () => 'filters',
    }),
  }),
})

export const {
  useGetHeroesQuery,
  useGetFiltersQuery,
  useDeleteHeroMutation,
  useAddHeroMutation,
} = api

export default api
