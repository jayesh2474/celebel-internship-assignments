import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deezerApi = createApi({
  reducerPath: "deezerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.deezer.com",
  }),
  endpoints: (builder) => ({
    getArtistTopTracks: builder.query({
      query: (artistId) => `/artist/${artistId}/top?limit=10`,
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

export const { useGetArtistTopTracksQuery } = deezerApi;
