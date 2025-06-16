import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get API key from environment variable or use a fallback
const rapidApiKey = process.env.REACT_APP_SHAZAM_CORE_RAPID_API_KEY;

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set("X-RapidAPI-Host", "shazam-core.p.rapidapi.com");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => ({
        url: "/charts/world",
        method: "GET",
        params: {
          limit: 20,
          offset: 0,
        },
      }),
      transformResponse: (response) => {
        if (!response || !Array.isArray(response)) {
          return [];
        }
        return response;
      },
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => ({
        url: "/search/multi",
        method: "GET",
        params: {
          search_type: "SONGS_ARTISTS",
          query: searchTerm,
          limit: 20,
          offset: 0,
        },
      }),
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => ({
        url: "/charts/country",
        method: "GET",
        params: {
          country_code: countryCode,
          limit: 20,
          offset: 0,
        },
      }),
    }),
    getArtistDetails: builder.query({
      query: (artistId) => ({
        url: "/artists/details",
        method: "GET",
        params: {
          artist_id: artistId,
        },
      }),
    }),
    getSongDetails: builder.query({
      query: (songId) => ({
        url: "/tracks/details",
        method: "GET",
        params: {
          track_id: songId,
        },
      }),
    }),
    getSongRelated: builder.query({
      query: (songId) => ({
        url: "/tracks/related",
        method: "GET",
        params: {
          track_id: songId,
          limit: 20,
          offset: 0,
        },
      }),
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsBySearchQuery,
  useGetSongsByCountryQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;
