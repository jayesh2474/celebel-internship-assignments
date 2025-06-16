import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get API key from environment variable
const rapidApiKey = process.env.REACT_APP_SHAZAM_CORE_RAPID_API_KEY;

// Debug log to check if API key is loaded
console.log("API Key loaded:", rapidApiKey ? "Yes" : "No");

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set("X-RapidAPI-Host", "shazam-core.p.rapidapi.com");

      // Debug log for headers
      console.log("Request headers:", {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      });

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => {
        console.log("Fetching top charts...");
        return {
          url: "/search/multi",
          method: "GET",
          params: {
            search_type: "SONGS_ARTISTS",
            query: "top hits",
          },
        };
      },
      transformResponse: (response) => {
        console.log("Top charts response:", response);
        if (!response || !response.tracks || !response.tracks.hits) {
          console.warn("Invalid response format:", response);
          return [];
        }
        // Transform the hits array into the format our components expect
        return response.tracks.hits.map((hit) => ({
          key: hit.track.key,
          title: hit.track.title,
          subtitle: hit.track.subtitle,
          images: {
            coverart: hit.track.images?.coverart || hit.track.share?.image,
            background: hit.track.images?.background || hit.track.share?.image,
          },
          hub: hit.track.hub,
          artists: hit.track.artists,
          url: hit.track.url,
        }));
      },
      transformErrorResponse: (response) => {
        console.error("API Error:", response);
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
        },
      }),
      transformResponse: (response) => {
        if (!response || !response.tracks || !response.tracks.hits) {
          return [];
        }
        return response.tracks.hits.map((hit) => ({
          key: hit.track.key,
          title: hit.track.title,
          subtitle: hit.track.subtitle,
          images: {
            coverart: hit.track.images?.coverart || hit.track.share?.image,
            background: hit.track.images?.background || hit.track.share?.image,
          },
          hub: hit.track.hub,
          artists: hit.track.artists,
          url: hit.track.url,
        }));
      },
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => ({
        url: "/search/multi",
        method: "GET",
        params: {
          search_type: "SONGS_ARTISTS",
          query: `top hits ${countryCode}`,
        },
      }),
      transformResponse: (response) => {
        if (!response || !response.tracks || !response.tracks.hits) {
          return [];
        }
        return response.tracks.hits.map((hit) => ({
          key: hit.track.key,
          title: hit.track.title,
          subtitle: hit.track.subtitle,
          images: {
            coverart: hit.track.images?.coverart || hit.track.share?.image,
            background: hit.track.images?.background || hit.track.share?.image,
          },
          hub: hit.track.hub,
          artists: hit.track.artists,
          url: hit.track.url,
        }));
      },
    }),
    getArtistDetails: builder.query({
      query: (artistId) => ({
        url: "/search/multi",
        method: "GET",
        params: {
          search_type: "ARTISTS",
          query: artistId,
        },
      }),
      transformResponse: (response) => {
        if (!response || !response.artists || !response.artists.hits) {
          return null;
        }
        const artist = response.artists.hits[0]?.artist;
        if (!artist) return null;

        return {
          id: artist.adamid,
          name: artist.name,
          alias: artist.alias,
          image: artist.avatar || artist.artwork,
          genres: artist.genres?.primary || [],
          bio: artist.bio || "",
          url: artist.url,
        };
      },
    }),
    getSongDetails: builder.query({
      query: (songId) => ({
        url: "/search/multi",
        method: "GET",
        params: {
          search_type: "SONGS",
          query: songId,
        },
      }),
      transformResponse: (response) => {
        if (!response || !response.tracks || !response.tracks.hits) {
          return null;
        }
        const track = response.tracks.hits[0]?.track;
        if (!track) return null;

        return {
          key: track.key,
          title: track.title,
          subtitle: track.subtitle,
          images: {
            coverart: track.images?.coverart || track.share?.image,
            background: track.images?.background || track.share?.image,
          },
          hub: track.hub,
          artists: track.artists,
          url: track.url,
        };
      },
    }),
    getSongRelated: builder.query({
      query: (songId) => ({
        url: "/search/multi",
        method: "GET",
        params: {
          search_type: "SONGS",
          query: songId,
        },
      }),
      transformResponse: (response) => {
        if (!response || !response.tracks || !response.tracks.hits) {
          return [];
        }
        return response.tracks.hits.map((hit) => ({
          key: hit.track.key,
          title: hit.track.title,
          subtitle: hit.track.subtitle,
          images: {
            coverart: hit.track.images?.coverart || hit.track.share?.image,
            background: hit.track.images?.background || hit.track.share?.image,
          },
          hub: hit.track.hub,
          artists: hit.track.artists,
          url: hit.track.url,
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
} = shazamCoreApi;
