import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { HiTrendingUp, HiPlay, HiPause, HiSparkles, HiStar } from 'react-icons/hi';
import { FiShuffle, FiCalendar, FiTrendingUp, FiGrid, FiList } from 'react-icons/fi';

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
    <div className="flex flex-col text-white">
      {/* Hero Section */}
      <div className="relative mb-8 p-8 bg-gradient-to-br from-orange-900/40 via-red-900/30 to-transparent rounded-3xl border border-white/5 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
                  <HiTrendingUp className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                  Top Charts
                </h1>
              </div>
              <p className="text-gray-300 text-lg">
                The hottest tracks right now • Updated daily
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleShuffleAll}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
              >
                <FiShuffle className="w-4 h-4" />
                Shuffle Play
              </button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-400">
              <FiCalendar className="w-4 h-4" />
              <span className="text-sm">Time Range:</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl">
              {timeRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimeRange(option.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                    timeRange === option.value
                      ? 'bg-white text-black font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Top 3 Featured */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.slice(0, 3).map((song, index) => (
              <div
                key={song.key || `featured-${index}`}
                className="group relative p-4 bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 rounded-2xl border border-white/10 cursor-pointer transition-all duration-300 hover:scale-105"
                onClick={() => handlePlayClick(song, index)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getRankIcon(index)}
                  </div>
                  <div className="relative">
                    <img
                      src={song.images?.coverart || song.album?.cover_medium || '/api/placeholder/64/64'}
                      alt={song.title}
                      className="w-16 h-16 rounded-xl object-cover shadow-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {activeSong?.key === song.key && isPlaying ? (
                        <HiPause className="w-5 h-5 text-white" />
                      ) : (
                        <HiPlay className="w-5 h-5 text-white ml-0.5" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {song.title}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">
                      {song.subtitle || song.artist?.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <HiSparkles className="w-5 h-5 text-yellow-400" />
          <h2 className="text-2xl font-bold">All Charts</h2>
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full">
            {data.length} tracks
          </span>
        </div>
        
        <div className="flex items-center gap-2">
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
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 auto-rows-fr">
          {data.map((song, index) => {
            const uniqueKey = song.key || `song-${index}-${song.title || 'untitled'}`;
            return (
              <div key={uniqueKey} className="relative w-full">
                <div className="absolute -top-3 -left-3 z-20 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
                <SongCard
                  song={song}
                  index={index}
                  handlePlayClick={handlePlayClick}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {data.map((song, index) => {
            const uniqueKey = song.key || `song-${index}-${song.title || 'untitled'}`;
            const isActive = activeSong?.key === song.key;
            
            return (
              <div
                key={uniqueKey}
                className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/10 border border-yellow-500/30' 
                    : 'hover:bg-white/5'
                }`}
                onClick={() => handlePlayClick(song, index)}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-8 text-center">
                  {index < 3 ? getRankIcon(index) : (
                    <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  )}
                </div>
                
                {/* Album Art */}
                <div className="relative">
                  <img
                    src={song.images?.coverart || song.album?.cover_medium || '/api/placeholder/48/48'}
                    alt={song.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isActive && isPlaying ? (
                      <HiPause className="w-4 h-4 text-white" />
                    ) : (
                      <HiPlay className="w-4 h-4 text-white ml-0.5" />
                    )}
                  </div>
                </div>
                
                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate transition-colors duration-300 ${
                    isActive ? 'text-yellow-400' : 'text-white group-hover:text-yellow-300'
                  }`}>
                    {song.title}
                  </h3>
                  <p className="text-sm text-gray-400 truncate">
                    {song.subtitle || song.artist?.name}
                  </p>
                </div>
                
                {/* Trending Indicator */}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FiTrendingUp className="w-4 h-4" />
                  <span>Hot</span>
                </div>
              </div>
            );
          })}
        </div>
      )}    </div>
  );
};

export default TopCharts;