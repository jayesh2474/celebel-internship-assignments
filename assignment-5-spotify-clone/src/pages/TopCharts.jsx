import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { HiTrendingUp, HiPlay, HiPause, HiSparkles, HiStar } from 'react-icons/hi';
import { FiShuffle, FiCalendar, FiGrid, FiList } from 'react-icons/fi';

const TopCharts = () => {
  const dispatch = useDispatch();
  const { data, isFetching, error } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [viewMode, setViewMode] = useState('grid');
  const [timeRange, setTimeRange] = useState('weekly');

  const handlePlayClick = (song, index) => {
    if (activeSong?.key === song.key) {
      dispatch(playPause(!isPlaying));
    } else {
      dispatch(setActiveSong({ song, data, index }));
      dispatch(playPause(true));
    }
  };

  const handleShuffleAll = () => {
    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomSong = data[randomIndex];
      dispatch(setActiveSong({ song: randomSong, data, index: randomIndex }));
      dispatch(playPause(true));
    }
  };
  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
          <HiStar className="w-4 h-4 text-white" />
        </div>;
      case 1:
        return <HiStar className="w-6 h-6 text-gray-300" />;
      case 2:
        return <HiStar className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>;
    }
  };

  const timeRangeOptions = [
    { value: 'daily', label: 'Today' },
    { value: 'weekly', label: 'This Week' },
    { value: 'monthly', label: 'This Month' },
    { value: 'yearly', label: 'This Year' }
  ];

  if (isFetching) return <Loader title="Loading top charts..." />;
  if (error) return <Error message="Error loading top charts. Please try again later." />;
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <Error message="No songs found. Please try again later." />;
  }
  return (
    <div className="flex flex-col text-white px-3 sm:px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Hero Section */}
      <div className="relative mb-4 sm:mb-6 md:mb-8 p-3 sm:p-6 md:p-8 bg-gradient-to-br from-orange-900/40 via-red-900/30 to-transparent rounded-2xl sm:rounded-3xl border border-white/5 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
                  <HiTrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                  Top Charts
                </h1>
              </div>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
                The hottest tracks right now • Updated daily
              </p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleShuffleAll}
                className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
              >
                <FiShuffle className="w-4 h-4" />
                <span className="hidden sm:inline">Shuffle Play</span>
                <span className="sm:hidden">Shuffle</span>
              </button>
            </div>
          </div>          {/* Time Range Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 text-gray-400">
              <FiCalendar className="w-4 h-4" />
              <span className="text-sm">Time Range:</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl overflow-x-auto">
              {timeRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimeRange(option.value)}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                    timeRange === option.value
                      ? 'bg-white text-black font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>          {/* Top 3 Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {data.slice(0, 3).map((song, index) => (
              <div
                key={song.key || `featured-${index}`}
                className="group relative p-3 sm:p-4 bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 rounded-2xl border border-white/10 cursor-pointer transition-all duration-300 hover:scale-105"
                onClick={() => handlePlayClick(song, index)}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    {getRankIcon(index)}
                  </div>
                  <div className="relative">
                    <img
                      src={song.images?.coverart || song.album?.cover_medium || '/api/placeholder/64/64'}
                      alt={song.title}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover shadow-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {activeSong?.key === song.key && isPlaying ? (
                        <HiPause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <HiPlay className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate text-white group-hover:text-yellow-400 transition-colors duration-300 text-sm sm:text-base">
                      {song.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">
                      {song.subtitle || song.artist?.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <HiSparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
          <h2 className="text-xl sm:text-2xl font-bold">All Charts</h2>
          <span className="px-2 sm:px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs sm:text-sm rounded-full">
            {data.length} tracks
          </span>
        </div>
        
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FiGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              viewMode === 'list' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FiList className="w-4 h-4" />
          </button>
        </div>
      </div>      {/* Charts Grid/List */}
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6' : 'grid-cols-1 gap-3 sm:gap-4'}`}>
        {data.map((song, i) => (
          <SongCard key={song.key || `song-${i}-${song.title || 'untitled'}`} song={song} index={i} handlePlayClick={handlePlayClick} />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;