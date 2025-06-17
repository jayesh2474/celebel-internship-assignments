import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { HiPlay, HiPause, HiTrendingUp, HiSparkles, HiHeart } from 'react-icons/hi';
import { FiMusic } from 'react-icons/fi';

const TopPlay = () => {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [hoveredSong, setHoveredSong] = useState(null);

  const topTracks = data?.slice(0, 5) || [];

  const handlePlayClick = (song, index) => {
    if (activeSong?.key === song.key) {
      dispatch(playPause(!isPlaying));
    } else {
      dispatch(setActiveSong({ song, data, index }));
      dispatch(playPause(true));
    }
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      {/* Header with animated gradient */}
      <div className="sticky top-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-transparent backdrop-blur-md p-6 border-b border-white/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg">
            <HiTrendingUp className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Top Charts
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <HiSparkles className="w-4 h-4" />
          <span>What's trending right now</span>
        </div>
      </div>

      {/* Loading State */}
      {isFetching && (
        <div className="p-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 mb-4 animate-pulse">
              <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-800 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Top Tracks */}
      <div className="p-6 space-y-3">
        {topTracks.map((song, index) => {
          const isActive = activeSong?.key === song.key;
          const isHovered = hoveredSong === song.key;
          
          return (
            <div
              key={song.key || `top-${index}`}
              className={`group relative flex items-center gap-4 p-3 rounded-xl transition-all duration-300 cursor-pointer
                ${isActive 
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/10 border border-green-500/30' 
                  : 'hover:bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10'
                }
              `}
              onMouseEnter={() => setHoveredSong(song.key)}
              onMouseLeave={() => setHoveredSong(null)}
              onClick={() => handlePlayClick(song, index)}
            >
              {/* Rank Number with Special Styling */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                ${index < 3 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black' 
                  : isActive 
                    ? 'bg-green-500 text-black' 
                    : 'bg-gray-700 text-gray-300'
                }
              `}>
                {index + 1}
              </div>

              {/* Album Art with Overlay */}
              <div className="relative flex-shrink-0">
                <img
                  src={song.images?.coverart || song.album?.cover_medium || '/api/placeholder/48/48'}
                  alt={song.title}
                  className="w-12 h-12 rounded-lg object-cover shadow-lg"
                />
                {/* Play Button Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg transition-opacity duration-300
                  ${isHovered || isActive ? 'opacity-100' : 'opacity-0'}
                `}>
                  {isActive && isPlaying ? (
                    <HiPause className="w-5 h-5 text-white" />
                  ) : (
                    <HiPlay className="w-5 h-5 text-white ml-0.5" />
                  )}
                </div>
              </div>

              {/* Song Info */}
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold truncate transition-colors duration-300
                  ${isActive ? 'text-green-400' : 'text-white group-hover:text-green-300'}
                `}>
                  {song.title || 'Unknown Title'}
                </h3>
                <p className="text-sm text-gray-400 truncate">
                  {song.subtitle || song.artist?.name || 'Unknown Artist'}
                </p>
              </div>

              {/* Like Button */}
              <button 
                className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-white/10 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add like functionality here
                }}
              >
                <HiHeart className="w-4 h-4 text-gray-400 hover:text-red-400" />
              </button>

              {/* Active Song Indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-500 rounded-r-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recently Played Section */}
      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <FiMusic className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Recently Played</h3>
        </div>
        
        <div className="space-y-2">
          {topTracks.slice(0, 3).map((song, index) => (
            <div 
              key={`recent-${song.key || index}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors duration-300"
            >
              <img
                src={song.images?.coverart || song.album?.cover_small || '/api/placeholder/32/32'}
                alt={song.title}
                className="w-8 h-8 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{song.title}</p>
                <p className="text-xs text-gray-400 truncate">{song.subtitle || song.artist?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-6 border-t border-white/5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Made for you</span>
          <div className="flex items-center gap-1 text-green-400">
            <HiTrendingUp className="w-4 h-4" />
            <span className="font-medium">Trending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPlay;
