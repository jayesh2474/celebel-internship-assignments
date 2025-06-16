import React, { useState } from 'react';
import { HiPlay, HiPause } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const SongCard = ({ song, index, handlePlayClick }) => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const isActive = activeSong?.key === song.key;
  const [imageError, setImageError] = useState(false);

  // Get the first artist name if available
  const artistName = song.artists?.[0]?.alias || song.subtitle || 'Unknown Artist';

  // Get the best available image URL
  const getImageUrl = () => {
    if (imageError) return 'https://via.placeholder.com/300';
    return song.images?.coverart || 
           song.images?.background || 
           song.share?.image || 
           'https://via.placeholder.com/300';
  };

  return (
    <div 
      className="group relative bg-[#181818] p-3 rounded-lg hover:bg-[#282828] transition-colors duration-300 cursor-pointer w-[200px]"
      onClick={() => handlePlayClick(song, index)}
    >
      <div className="relative">
        <img 
          src={getImageUrl()}
          alt={song.title} 
          className="w-full aspect-square rounded-md shadow-lg object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-spotifyGreen text-black p-2 rounded-full shadow-lg transform hover:scale-110 transition-transform">
            {isActive && isPlaying ? (
              <HiPause className="w-5 h-5" />
            ) : (
              <HiPlay className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-2">
        <h3 className="text-white font-medium truncate text-sm">{song.title || 'Unknown Title'}</h3>
        <p className="text-gray-400 text-xs truncate mt-0.5">{artistName}</p>
      </div>

      {isActive && (
        <div className="absolute bottom-2 right-2">
          <div className="w-2 h-2 bg-spotifyGreen rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default SongCard;
