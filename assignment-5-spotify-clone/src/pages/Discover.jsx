import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { HiSparkles, HiTrendingUp, HiHeart, HiPlay, HiRefresh } from 'react-icons/hi';
import { FiShuffle, FiMusic, FiHeadphones } from 'react-icons/fi';

const Discover = () => {
  const dispatch = useDispatch();
  const { data, isFetching, refetch } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [currentTime, setCurrentTime] = useState('');
  const [featuredTrack, setFeaturedTrack] = useState(null);

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      setCurrentTime(`${displayHours}:${now.getMinutes().toString().padStart(2, '0')} ${period}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setFeaturedTrack(data[Math.floor(Math.random() * Math.min(5, data.length))]);
    }
  }, [data]);

  const handlePlayClick = (song, index) => {
    if (activeSong?.key === song.key) {
      dispatch(playPause(!isPlaying));
    } else {
      dispatch(setActiveSong({ song, data, index }));
      dispatch(playPause(true));
    }
  };

  const handleShufflePlay = () => {
    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomSong = data[randomIndex];
      dispatch(setActiveSong({ song: randomSong, data, index: randomIndex }));
      dispatch(playPause(true));
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (isFetching) return <Loader title="Loading your music..." />;
  return (
    <div className="flex flex-col text-white px-3 sm:px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Hero Section with Dynamic Greeting */}
      <div className="relative mb-4 sm:mb-6 md:mb-8 p-3 sm:p-6 md:p-8 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-transparent rounded-2xl sm:rounded-3xl border border-white/5 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-green-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <HiSparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" />
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-green-200 to-green-400 bg-clip-text text-transparent">
                  {getGreeting()}
                </h1>
              </div>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg">It's {currentTime} - time for some great music</p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => refetch()}
                className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
                title="Refresh recommendations"
              >
                <HiRefresh className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleShufflePlay}
                className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/25"
              >
                <FiShuffle className="w-4 h-4" />
                <span className="hidden sm:inline">Shuffle Play</span>
                <span className="sm:hidden">Shuffle</span>
              </button>
            </div>
          </div>          {/* Featured Track */}
          {featuredTrack && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative group cursor-pointer" onClick={() => handlePlayClick(featuredTrack, 0)}>
                  <img
                    src={featuredTrack.images?.coverart || featuredTrack.album?.cover_big || '/api/placeholder/80/80'}
                    alt={featuredTrack.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <HiPlay className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <HiTrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                    <span className="text-green-400 text-xs sm:text-sm font-semibold">Featured Track</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 truncate">{featuredTrack.title}</h3>
                  <p className="text-gray-400 text-sm truncate">{featuredTrack.subtitle || featuredTrack.artist?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-end">
                <FiHeadphones className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">2.1M plays</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Access Categories */}
      <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Made for You', icon: HiHeart, color: 'from-red-500 to-pink-600' },
            { name: 'Recently Played', icon: FiMusic, color: 'from-blue-500 to-purple-600' },
            { name: 'Trending Now', icon: HiTrendingUp, color: 'from-green-500 to-emerald-600' },
            { name: 'Discover Weekly', icon: HiSparkles, color: 'from-yellow-500 to-orange-600' }
          ].map((category, index) => (
            <div
              key={index}
              className="group p-4 bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/5 rounded-2xl border border-white/5 hover:border-white/10 cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Popular Right Now</h2>
          <p className="text-gray-400">Based on what people are listening to</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <FiMusic className="w-4 h-4" />
          <span>{data?.length || 0} tracks available</span>
        </div>
      </div>      {/* Songs Grid with Enhanced Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {data?.map((song, i) => (
          <div key={song.key || `song-${i}-${song.title || 'untitled'}`} className="w-full">
            <SongCard
              song={song}
              index={i}
              handlePlayClick={handlePlayClick}
            />
          </div>
        ))}
      </div>

      {/* Load More Section */}
      <div className="mt-12 text-center">
        <button 
          onClick={() => refetch()}
          className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
        >
          Load More Tracks
        </button>
      </div>
    </div>
  );
};

export default Discover;
