import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Deezer API does not require an API key for public data

export const deezerApi = createApi({
  reducerPath: "deezerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/deezer",
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/chart/0/tracks",
      transformResponse: (response) => {
        if (!response || !response.data) return [];
        return response.data.map((track) => ({
          key: track.id,
          title: track.title,
          subtitle: track.artist?.name,
          images: {
            coverart: track.album?.cover_big,
            background: track.album?.cover_xl,
          },
          preview: track.preview,
          artists: [track.artist],
          url: track.link,
        }));
      },
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search?q=${encodeURIComponent(searchTerm)}`,
      transformResponse: (response) => {
        if (!response || !response.data) return [];
        return response.data.map((track) => ({
          key: track.id,
          title: track.title,
          subtitle: track.artist?.name,
          images: {
            coverart: track.album?.cover_big,
            background: track.album?.cover_xl,
          },
          preview: track.preview,
          artists: [track.artist],
          url: track.link,
        }));
      },
    }),
    getSongsByCountry: builder.query({
      // Deezer does not provide direct country charts for all countries, fallback to global
      query: (countryCode) => "/chart/0/tracks",
      transformResponse: (response) => {
        if (!response || !response.data) return [];
        return response.data.map((track) => ({
          key: track.id,
          title: track.title,
          subtitle: track.artist?.name,
          images: {
            coverart: track.album?.cover_big,
            background: track.album?.cover_xl,
          },
          preview: track.preview,
          artists: [track.artist],
          url: track.link,
        }));
      },
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artist/${artistId}`,
      transformResponse: (artist) => {
        if (!artist) return null;
        return {
          id: artist.id,
          name: artist.name,
          image: artist.picture_xl || artist.picture_big,
          genres: artist.genres?.data?.map((g) => g.name) || [],
          nb_fan: artist.nb_fan,
          url: artist.link,
        };
      },
    }),
    getSongDetails: builder.query({
      query: (songId) => `/track/${songId}`,
      transformResponse: (track) => {
        if (!track) return null;
        return {
          key: track.id,
          title: track.title,
          subtitle: track.artist?.name,
          images: {
            coverart: track.album?.cover_big,
            background: track.album?.cover_xl,
          },
          preview: track.preview,
          artists: [track.artist],
          url: track.link,
        };
      },
    }),
    getSongRelated: builder.query({
      query: (songId) => `/track/${songId}/related`,
      transformResponse: (response) => {
        if (!response || !response.data) return [];
        return response.data.map((track) => ({
          key: track.id,
          title: track.title,
          subtitle: track.artist?.name,
          images: {
            coverart: track.album?.cover_big,
            background: track.album?.cover_xl,
          },
          preview: track.preview,
          artists: [track.artist],
          url: track.link,
        }));
      },
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
} = deezerApi;
