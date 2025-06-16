import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const Discover = () => {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePlayClick = (song, index) => {
    if (activeSong?.key === song.key) {
      dispatch(playPause(!isPlaying));
    } else {
      dispatch(setActiveSong({ song, data, index }));
      dispatch(playPause(true));
    }
  };

  if (isFetching) return <Loader title="Loading songs..." />;

  return (
    <div className="flex flex-col text-white px-6 py-4 ml-60">
      <h2 className="text-3xl font-bold mb-6">Discover</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {data?.map((song, i) => (
          <SongCard
            key={song.key || `song-${i}-${song.title || 'untitled'}`}
            song={song}
            index={i}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
