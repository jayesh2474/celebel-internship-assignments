import React, { useState } from 'react';
import { HiPlay, HiPause, HiHeart, HiDotsVertical, HiPlus } from 'react-icons/hi';
import { FiShare, FiDownload } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const SongCard = ({ song, index, handlePlayClick }) => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const isActive = activeSong?.key === song.key;
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Get the first artist name if available
  const artistName = song.artists?.[0]?.name || song.subtitle || song.artist?.name || 'Unknown Artist';

  // Get the best available image URL
  const getImageUrl = () => {
    if (imageError) return '/api/placeholder/300/300';
    return song.images?.coverart || 
           song.images?.background || 
           song.album?.cover_big || 
           song.album?.cover_medium || 
           '/api/placeholder/300/300';
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleOptions = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };  return (
    <div 
      className="group relative bg-gradient-to-b from-white/[0.02] to-transparent hover:from-white/[0.08] hover:to-white/[0.02] p-5 rounded-2xl border border-white/[0.02] hover:border-white/10 transition-all duration-500 cursor-pointer backdrop-blur-sm hover:scale-[1.03] hover:shadow-2xl w-full max-w-[280px] mx-auto"
      onClick={() => handlePlayClick(song, index)}
      onMouseLeave={() => setShowOptions(false)}
    >
      {/* Card Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">        {/* Image Container with Enhanced Hover Effects */}
        <div className="relative mb-5 overflow-hidden rounded-xl">
          <img 
            src={getImageUrl()}
            alt={song.title} 
            className="w-full aspect-square rounded-xl shadow-lg object-cover transition-all duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          
          {/* Play Button with Enhanced Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              className={`bg-green-500 hover:bg-green-400 text-black p-4 rounded-full shadow-2xl transform transition-all duration-300 ${
                isActive && isPlaying 
                  ? 'scale-100 opacity-100' 
                  : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
              } hover:scale-110`}
              onClick={(e) => {
                e.stopPropagation();
                handlePlayClick(song, index);
              }}
            >
              {isActive && isPlaying ? (
                <HiPause className="w-7 h-7" />
              ) : (
                <HiPlay className="w-7 h-7 ml-1" />
              )}
            </button>
          </div>

          {/* Top Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-15px] group-hover:translate-y-0">
            <button
              onClick={handleLike}
              className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                isLiked 
                  ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-black/60 hover:bg-black/80 text-gray-300 hover:text-red-400'
              }`}
            >
              <HiHeart className="w-5 h-5" />
            </button>
            <button
              onClick={handleOptions}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <HiDotsVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Active Song Indicator */}
          {isActive && (
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/95 backdrop-blur-sm rounded-full shadow-lg">
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Now Playing</span>
              </div>
            </div>
          )}

          
          {/* <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">{index + 1}</span>
            </div>
          </div> */}
        </div>
          {/* Song Information */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold truncate text-lg group-hover:text-green-400 transition-colors duration-300">
            {song.title || 'Unknown Title'}
          </h3>
          <p className="text-gray-400 text-sm truncate hover:text-gray-300 transition-colors duration-300">
            {artistName}
          </p>
          
          {/* Additional Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              Popular
            </span>
            <span>3:24</span>
          </div>
        </div>

        {/* Options Menu */}
        {showOptions && (
          <div className="absolute top-20 right-4 bg-gray-900/98 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl py-3 min-w-[180px] z-50 animate-slide-in">
            <button className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200 flex items-center gap-3">
              <HiPlus className="w-5 h-5" />
              Add to playlist
            </button>
            <button className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200 flex items-center gap-3">
              <FiShare className="w-5 h-5" />
              Share
            </button>
            <button className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200 flex items-center gap-3">
              <FiDownload className="w-5 h-5" />
              Download
            </button>
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default SongCard;
