import React from 'react';
import { HiPlay, HiPause } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const SongCard = ({ song, index, handlePlayClick }) => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const isActive = activeSong?.key === song.key;

  return (
    <div 
      className="group relative bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors duration-300"
      onClick={() => handlePlayClick(song, index)}
    >
      <div className="relative">
        <img 
          src={song.images?.coverart} 
          alt={song.title} 
          className="w-full aspect-square rounded-md shadow-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-spotifyGreen text-black p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform">
            {isActive && isPlaying ? (
              <HiPause className="w-6 h-6" />
            ) : (
              <HiPlay className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-white font-medium truncate">{song.title}</h3>
        <p className="text-gray-400 text-sm truncate mt-1">{song.subtitle}</p>
      </div>

      {isActive && (
        <div className="absolute bottom-4 right-4">
          <div className="w-2 h-2 bg-spotifyGreen rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default SongCard;
