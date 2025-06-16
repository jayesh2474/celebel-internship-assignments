import React from 'react';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';

const TopCharts = () => {
  const { data, isFetching } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading top charts..." />;

  return (
    <div className="flex flex-col text-white px-6 py-4 ml-60">
      <h2 className="text-3xl font-bold mb-6">Top Charts</h2>
      <div className="flex flex-wrap gap-6">
        {data?.map((song, i) => (
          <SongCard key={song.key} song={song} index={i} />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;