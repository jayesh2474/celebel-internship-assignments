import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';

const Discover = () => {
  const { data, isFetching, } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading songs..." />;

  return (
    <div className="flex flex-col text-white px-6 py-4 ml-60">
      <h2 className="text-3xl font-bold mb-6">Discover</h2>
      <div className="flex flex-wrap gap-6">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
