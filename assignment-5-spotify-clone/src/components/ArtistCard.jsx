import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPlay, HiHeart, HiUserGroup, HiSparkles } from 'react-icons/hi';
import { FiMoreHorizontal, FiShare } from 'react-icons/fi';

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getImageUrl = () => {
    if (imageError) return '/api/placeholder/300/300';
    return artist?.picture_xl || artist?.picture_big || artist?.picture_medium || '/api/placeholder/300/300';
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Add share functionality
  };

  const formatFollowers = (count) => {
    if (!count) return '0 followers';
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M followers`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K followers`;
    }
    return `${count} followers`;
  };
  return (
    <div
      className="group relative bg-gradient-to-b from-white/[0.02] to-transparent hover:from-white/[0.08] hover:to-white/[0.02] p-6 rounded-3xl border border-white/[0.02] hover:border-white/10 transition-all duration-500 cursor-pointer backdrop-blur-sm hover:scale-[1.02] hover:shadow-2xl w-full max-w-[280px] mx-auto"
      onClick={() => navigate(`/artists/${artist?.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Header Actions */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0 z-10">
        <button
          onClick={handleLike}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
            isLiked 
              ? 'bg-red-500/80 text-white' 
              : 'bg-black/50 hover:bg-black/70 text-gray-300 hover:text-red-400'
          }`}
        >
          <HiHeart className="w-4 h-4" />
        </button>
        <button
          onClick={handleShare}
          className="p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
        >
          <FiShare className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
        >
          <FiMoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Artist Image with Enhanced Effects */}
        <div className="relative mb-4">
          <div className="relative overflow-hidden rounded-full">
            <img
              src={getImageUrl()}
              alt={artist?.name || 'Artist'}
              className="w-32 h-32 rounded-full object-cover shadow-2xl transition-all duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            
            {/* Animated Ring */}
            <div className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
              isHovered 
                ? 'border-green-400 shadow-lg shadow-green-400/30 animate-pulse' 
                : 'border-transparent'
            }`}></div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </div>

          {/* Play Button Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <button 
              className="bg-green-500 hover:bg-green-400 text-black p-3 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                // Add play artist functionality
              }}
            >
              <HiPlay className="w-5 h-5 ml-0.5" />
            </button>
          </div>

          {/* Verified Badge */}
          {artist?.nb_fan > 100000 && (
            <div className="absolute -top-2 -right-2 bg-blue-500 p-1.5 rounded-full">
              <HiSparkles className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        {/* Artist Information */}
        <div className="text-center space-y-2 w-full">
          <h3 className="text-white font-bold text-lg truncate group-hover:text-green-400 transition-colors duration-300">
            {artist?.name || 'Unknown Artist'}
          </h3>
          
          {/* Followers Count */}
          <div className="flex items-center justify-center gap-1 text-gray-400 text-sm">
            <HiUserGroup className="w-4 h-4" />
            <span>{formatFollowers(artist?.nb_fan)}</span>
          </div>
          
          {/* Genre Tags */}
          {artist?.genres && artist.genres.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 mt-2">
              {artist.genres.slice(0, 2).map((genre, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-full border border-white/20"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
          
          {/* Popularity Indicator */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className={`w-1 h-3 rounded-full transition-all duration-300 delay-${i * 100} ${
                      i < Math.floor((artist?.nb_fan || 0) / 1000000) 
                        ? 'bg-green-400' 
                        : 'bg-gray-600'
                    }`}
                  ></div>
                ))}
              </div>
              <span>Popularity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ArtistCard;