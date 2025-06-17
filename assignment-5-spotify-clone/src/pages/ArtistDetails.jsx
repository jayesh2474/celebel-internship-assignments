import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';
import { useGetArtistTopTracksQuery } from '../redux/services/deezerArtist';
import Loader from '../components/Loader';
import SongCard from '../components/SongCard';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const ArtistDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: artist, isFetching: isFetchingArtist } = useGetArtistDetailsQuery(id);
  const { data: topTracks, isFetching: isFetchingTracks } = useGetArtistTopTracksQuery(id);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePlayClick = (song, index) => {
    if (activeSong?.key === song.key) {
      dispatch(playPause(!isPlaying));
    } else {
      dispatch(setActiveSong({ song, data: topTracks, index }));
      dispatch(playPause(true));
    }
  };

  if (isFetchingArtist || isFetchingTracks) return <Loader title="Loading artist details..." />;  return (
    <div className="text-white px-3 sm:px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent mb-2">
          {artist?.name || 'Artist Details'}
        </h2>
      </div>

      {/* Artist Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 sm:mb-8 gap-4 sm:gap-6">
        <img 
          src={artist?.image} 
          alt={artist?.name} 
          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-2xl" 
        />
        <div className="text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{artist?.name}</h3>
          {artist?.nb_fan && (
            <p className="text-gray-400 text-sm sm:text-base mb-1">
              {artist.nb_fan.toLocaleString()} Fans
            </p>
          )}
          {artist?.genres && artist.genres.length > 0 && (
            <p className="text-gray-400 text-sm sm:text-base">
              {artist.genres.join(', ')}
            </p>
          )}
        </div>
      </div>

      {/* Top Tracks Section */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
          Top Tracks
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {topTracks?.map((song, i) => (
            <SongCard 
              key={song.key || `song-${i}-${song.title || 'untitled'}`} 
              song={song} 
              index={i} 
              handlePlayClick={handlePlayClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;