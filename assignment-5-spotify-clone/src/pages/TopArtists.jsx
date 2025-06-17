import React, { useState, useMemo } from 'react';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import ArtistCard from '../components/ArtistCard';
import Loader from '../components/Loader';
import { HiStar, HiTrendingUp, HiSparkles, HiUsers, HiPlay } from 'react-icons/hi';
import { FiGrid, FiList, FiFilter } from 'react-icons/fi';

const TopArtists = () => {
  const { data, isFetching } = useGetTopChartsQuery();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique artists from tracks data
  const artists = useMemo(() => {
    if (!data) return [];
    
    const artistMap = new Map();
    
    data.forEach((track, index) => {
      const artistName = track.subtitle || track.artist?.name || 'Unknown Artist';
      const artistId = track.artist?.id || `artist-${index}`;
      
      if (!artistMap.has(artistId)) {
        artistMap.set(artistId, {
          id: artistId,
          name: artistName,
          picture_xl: track.images?.coverart || track.album?.cover_big,
          picture_big: track.images?.coverart || track.album?.cover_medium,
          nb_fan: Math.floor(Math.random() * 10000000) + 100000, // Mock followers
          genres: ['Pop', 'Hip-Hop', 'R&B', 'Electronic'].slice(0, Math.floor(Math.random() * 3) + 1),
          trackCount: 1,
          rank: index + 1
        });
      } else {
        const artist = artistMap.get(artistId);
        artist.trackCount += 1;
        artist.rank = Math.min(artist.rank, index + 1); // Keep best rank
      }
    });
    
    const artistsArray = Array.from(artistMap.values());
    
    // Sort artists
    switch (sortBy) {
      case 'name':
        return artistsArray.sort((a, b) => a.name.localeCompare(b.name));
      case 'followers':
        return artistsArray.sort((a, b) => b.nb_fan - a.nb_fan);
      case 'tracks':
        return artistsArray.sort((a, b) => b.trackCount - a.trackCount);
      default: // popularity
        return artistsArray.sort((a, b) => a.rank - b.rank);
    }
  }, [data, sortBy]);

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
          <HiStar className="w-5 h-5 text-white" />
        </div>;
      case 1:
        return <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
          <HiStar className="w-5 h-5 text-white" />
        </div>;
      case 2:
        return <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
          <HiStar className="w-5 h-5 text-white" />
        </div>;
      default:
        return <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">#{index + 1}</span>
        </div>;
    }
  };

  const formatFollowers = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (isFetching) return <Loader title="Loading top artists..." />;
  return (
    <div className="flex flex-col text-white px-3 sm:px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Hero Section */}
      <div className="relative mb-4 sm:mb-6 md:mb-8 p-3 sm:p-6 md:p-8 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-transparent rounded-2xl sm:rounded-3xl border border-white/5 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
                  <HiUsers className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                  Top Artists
                </h1>
              </div>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
                The most popular artists right now • {artists.length} artists
              </p>
            </div>
          </div>          {/* Top 3 Featured Artists */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {artists.slice(0, 3).map((artist, index) => (
              <div
                key={artist.id}
                className="group relative p-3 sm:p-4 md:p-6 bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 rounded-2xl border border-white/10 cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    {getRankIcon(index)}
                  </div>
                  <div className="relative">
                    <img
                      src={artist.picture_xl || artist.picture_big || '/api/placeholder/64/64'}
                      alt={artist.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <HiPlay className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg truncate text-white group-hover:text-purple-400 transition-colors duration-300">
                      {artist.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {formatFollowers(artist.nb_fan)} followers
                    </p>
                    <p className="text-xs text-gray-500">
                      {artist.trackCount} tracks in charts
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <HiSparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold">All Artists</h2>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm transition-all duration-300 ${
              showFilters ? 'bg-white/20 text-white' : 'bg-white/5 hover:bg-white/10 text-gray-300'
            }`}
          >
            <FiFilter className="w-4 h-4" />
            <span className="hidden sm:inline">Sort & Filter</span>
            <span className="sm:hidden">Filter</span>
          </button>
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
      </div>      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium mb-2">Sort by</label>
              <select
                className="w-full sm:w-auto bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none text-sm"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="popularity">Popularity</option>
                <option value="name">Name</option>
                <option value="followers">Followers</option>
                <option value="tracks">Chart Tracks</option>
              </select>
            </div>
          </div>
        </div>
      )}      {/* Artists Grid/List */}
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6' : 'grid-cols-1 gap-3 sm:gap-4'}`}>
        {artists.map((artist, i) => (
          <ArtistCard key={artist.id || `artist-${i}`} artist={artist} index={i} />
        ))}
      </div>
    </div>  );
};

export default TopArtists;
