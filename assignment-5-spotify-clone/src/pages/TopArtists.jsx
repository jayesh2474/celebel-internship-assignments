import React from 'react';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import ArtistCard from '../components/ArtistCard';
import Loader from '../components/Loader';

const TopArtists = () => {
  const { data, isFetching } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading top artists..." />;

  return (
    <div className="flex flex-col text-white px-6 py-4 ml-60">
      <h2 className="text-3xl font-bold mb-6">Top Artists</h2>
      <div className="flex flex-wrap gap-6">
        {data?.map((track) => (
          <ArtistCard key={track.key} artist={track.artists[0]} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
