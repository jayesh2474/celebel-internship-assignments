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
  }  return (
    <div className="flex flex-col text-white px-3 sm:px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-green-200 to-green-400 bg-clip-text text-transparent mb-2">
          Around You
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Popular songs in {country === 'IN' ? 'India' : country}
        </p>
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
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

