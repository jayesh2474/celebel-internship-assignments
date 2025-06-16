import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const AroundYou = () => {
  const dispatch = useDispatch();
  const country = 'IN'; // You can make this dynamic with geolocation
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePlayClick = (song, index) => {
    if (activeSong?.key === song.key) {
      dispatch(playPause(!isPlaying));
    } else {
      dispatch(setActiveSong({ song, data, index }));
      dispatch(playPause(true));
    }
  };

  if (isFetching) return <Loader title="Loading songs around you..." />;
  if (error) return <Error message="Error loading songs. Please try again later." />;
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <Error message="No songs found in your region." />;
  }

  return (
    <div className="flex flex-col text-white px-6 py-4 ml-60">
      <h2 className="text-3xl font-bold mb-6">Around You - {country}</h2>
      <div className="flex flex-wrap gap-6">
        {data.map((song, index) => {
          // Ensure we have a unique key even if song.key is undefined
          const uniqueKey = song.key || `song-${index}-${song.title || 'untitled'}`;
          return (
            <SongCard
              key={uniqueKey}
              song={song}
              index={index}
              handlePlayClick={handlePlayClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AroundYou;

