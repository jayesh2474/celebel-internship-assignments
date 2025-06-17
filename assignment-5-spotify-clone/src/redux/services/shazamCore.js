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
      async transformResponse(response, meta, arg) {
        // If data is empty but total > 0 and next exists, fetch the next page
        let tracks = response.data || [];
        let nextUrl = response.next;
        let tries = 0;
        while (tracks.length === 0 && nextUrl && tries < 3) {
          // Remove Deezer's domain from nextUrl for proxy
          const nextPath = nextUrl.replace("https://api.deezer.com", "");
          const res = await fetch(`http://localhost:5000/deezer${nextPath}`);
          const nextData = await res.json();
          tracks = nextData.data || [];
          nextUrl = nextData.next;
          tries++;
        }
        return tracks
          .filter((track) => track.preview)
          .map((track) => ({
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
            genre_id: track.genre_id || null,
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
    // Add a genres endpoint for filter options
    getGenres: builder.query({
      query: () => "/genre",
      transformResponse: (response) => {
        if (!response || !response.data) return [];
        // Remove the first genre ("All") if present
        return response.data.filter((g) => g.id !== 0);
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
  useGetGenresQuery,
} = deezerApi;
