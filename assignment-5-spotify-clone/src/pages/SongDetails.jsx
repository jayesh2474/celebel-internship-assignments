import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';
import Loader from '../components/Loader';
import SongCard from '../components/SongCard';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { data: songData, isFetching: fetchingSong } = useGetSongDetailsQuery(songid);
  const { data: relatedSongs, isFetching: fetchingRelated } = useGetSongRelatedQuery(songid);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePlayClick = (song, index) => {
    if (activeSong?.key === song.key) {
      dispatch(playPause(!isPlaying));
    } else {
      dispatch(setActiveSong({ song, data: relatedSongs, index }));
      dispatch(playPause(true));
    }
  };

  if (fetchingSong || fetchingRelated) return <Loader title="Loading song details..." />;

  return (
    <div className="text-white px-6 py-4 ml-60">
      <h2 className="text-3xl font-bold mb-4">{songData?.title}</h2>
      <p className="text-gray-300 text-sm mb-6">{songData?.sections[1]?.text?.join('\n')}</p>

      <h3 className="text-xl font-semibold mb-4">Related Songs</h3>
      <div className="flex flex-wrap gap-6">
        {relatedSongs?.map((song, i) => (
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

export default SongDetails;