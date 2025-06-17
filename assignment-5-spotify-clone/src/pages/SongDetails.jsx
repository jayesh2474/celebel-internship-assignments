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

  if (fetchingSong || fetchingRelated) return <Loader title="Loading song details..." />;  return (
    <div className="text-white px-3 sm:px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
          {songData?.title}
        </h2>
        
        {/* Song Lyrics */}
        {songData?.sections?.[1]?.text && (
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-4 sm:p-6 rounded-2xl border border-white/10 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-purple-300">Lyrics</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {songData.sections[1].text.join('\n')}
            </p>
          </div>
        )}
      </div>

      {/* Related Songs Section */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
          Related Songs
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
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
    </div>
  );
};

export default SongDetails;