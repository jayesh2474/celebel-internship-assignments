import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';
import Loader from '../components/Loader';
import SongCard from '../components/SongCard';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const ArtistDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isFetching } = useGetArtistDetailsQuery(id);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePlayClick = (song, index) => {
    if (activeSong?.key === song.key) {
      dispatch(playPause(!isPlaying));
    } else {
      dispatch(setActiveSong({ song, data: data?.data[0]?.views['top-songs']?.data, index }));
      dispatch(playPause(true));
    }
  };

  if (isFetching) return <Loader title="Loading artist details..." />;

  return (
    <div className="text-white px-6 py-4 ml-60">
      <h2 className="text-3xl font-bold mb-6">Artist Details</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {data?.data[0]?.views['top-songs']?.data.map((song, i) => (
          <SongCard 
            key={song.id || `song-${i}-${song.title || 'untitled'}`} 
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