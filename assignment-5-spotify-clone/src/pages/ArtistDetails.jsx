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

  if (isFetchingArtist || isFetchingTracks) return <Loader title="Loading artist details..." />;

  return (
    <div className="text-white px-6 py-4 ml-60">
      <h2 className="text-3xl font-bold mb-6">{artist?.name || 'Artist Details'}</h2>
      <div className="flex items-center mb-6">
        <img src={artist?.image} alt={artist?.name} className="w-32 h-32 rounded-full object-cover mr-6" />
        <div>
          <p className="text-lg font-semibold">{artist?.name}</p>
          <p className="text-gray-400">Fans: {artist?.nb_fan}</p>
          <p className="text-gray-400">Genres: {artist?.genres?.join(', ')}</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-4">Top Tracks</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
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
  );
};

export default ArtistDetails;