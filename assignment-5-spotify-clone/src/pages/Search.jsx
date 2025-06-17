import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetSongsBySearchQuery, useGetGenresQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';
import ArtistCard from '../components/ArtistCard';
import Loader from '../components/Loader';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { HiSearch, HiFilter, HiX, HiSparkles, HiTrendingUp, HiMusicNote } from 'react-icons/hi';
import { FiGrid, FiList, FiShuffle } from 'react-icons/fi';

const Search = () => {
  const { term } = useParams();
  const dispatch = useDispatch();
  const { data, isFetching } = useGetSongsBySearchQuery(term);
  const { data: genres } = useGetGenresQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  
  const [selectedGenre, setSelectedGenre] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for demonstration - in real app, this would come from API
  const mockArtists = data?.slice(0, 3)?.map((song, index) => ({
    id: index + 1,
    name: song.artist?.name || song.subtitle || 'Unknown Artist',
    picture_xl: song.images?.coverart || song.album?.cover_big,
    nb_fan: Math.floor(Math.random() * 10000000) + 100000,
    genres: ['Pop', 'Electronic']
  })) || [];

  const handlePlayClick = (song, index) => {
    if (activeSong?.key === song.key) {
      dispatch(playPause(!isPlaying));
    } else {
      dispatch(setActiveSong({ song, data, index }));
      dispatch(playPause(true));
    }
  };

  const handleShuffleAll = () => {
    if (filteredSongs && filteredSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredSongs.length);
      const randomSong = filteredSongs[randomIndex];
      dispatch(setActiveSong({ song: randomSong, data: filteredSongs, index: randomIndex }));
      dispatch(playPause(true));
    }
  };

  const clearFilters = () => {
    setSelectedGenre('');
    setSortBy('relevance');
    setActiveTab('all');
  };

  // Filter and sort songs
  const filteredSongs = React.useMemo(() => {
    let filtered = data || [];
    
    if (selectedGenre) {
      filtered = filtered.filter(song => song.genre_id === Number(selectedGenre));
    }

    // Sort songs
    switch (sortBy) {
      case 'popularity':
        filtered = [...filtered].sort((a, b) => (b.rank || 0) - (a.rank || 0));
        break;
      case 'duration':
        filtered = [...filtered].sort((a, b) => (a.duration || 0) - (b.duration || 0));
        break;
      case 'artist':
        filtered = [...filtered].sort((a, b) => 
          (a.subtitle || '').localeCompare(b.subtitle || '')
        );
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [data, selectedGenre, sortBy]);

  if (isFetching) return <Loader title={`Searching for "${term}"...`} />;

  const tabs = [
    { id: 'all', label: 'All', count: (filteredSongs?.length || 0) + mockArtists.length },
    { id: 'songs', label: 'Songs', count: filteredSongs?.length || 0 },
    { id: 'artists', label: 'Artists', count: mockArtists.length },
    { id: 'playlists', label: 'Playlists', count: 0 }
  ];

  return (
    <div className="text-white">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
            <HiSearch className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-green-200 to-green-400 bg-clip-text text-transparent">
              Search Results
            </h1>
            <p className="text-gray-400 text-lg">
              {filteredSongs?.length || 0} results for "<span className="text-white font-semibold">{term}</span>"
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleShuffleAll}
            disabled={!filteredSongs?.length}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/25"
          >
            <FiShuffle className="w-4 h-4" />
            Shuffle Play
          </button>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              showFilters || selectedGenre 
                ? 'bg-white/20 text-white' 
                : 'bg-white/5 hover:bg-white/10 text-gray-300'
            }`}
          >
            <HiFilter className="w-4 h-4" />
            Filters
            {selectedGenre && (
              <span className="ml-1 px-2 py-0.5 bg-green-500 text-black text-xs rounded-full">1</span>
            )}
          </button>

          <div className="flex items-center gap-2 ml-auto">
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
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                Clear all
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Genre Filter */}
            {genres && genres.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <select
                  className="w-full bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20 focus:border-green-400 focus:outline-none"
                  value={selectedGenre}
                  onChange={e => setSelectedGenre(e.target.value)}
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium mb-2">Sort by</label>
              <select
                className="w-full bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20 focus:border-green-400 focus:outline-none"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="popularity">Popularity</option>
                <option value="duration">Duration</option>
                <option value="artist">Artist</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-white/5 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-white text-black font-semibold'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab.id ? 'bg-black/20' : 'bg-white/20'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results Content */}
      <div className="space-y-8">
        {/* Artists Section */}
        {(activeTab === 'all' || activeTab === 'artists') && mockArtists.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <HiSparkles className="w-5 h-5 text-yellow-400" />
              <h2 className="text-2xl font-bold">Artists</h2>
            </div>            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 auto-rows-fr">
              {mockArtists.map((artist, i) => (
                <div key={`artist-${i}`} className="w-full">
                  <ArtistCard artist={artist} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Songs Section */}
        {(activeTab === 'all' || activeTab === 'songs') && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HiMusicNote className="w-5 h-5 text-green-400" />
                <h2 className="text-2xl font-bold">Songs</h2>
              </div>
              {filteredSongs?.length > 0 && (
                <span className="text-gray-400 text-sm">
                  {filteredSongs.length} tracks found
                </span>
              )}
            </div>            {filteredSongs && filteredSongs.length > 0 ? (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 auto-rows-fr' 
                  : 'space-y-4'
              }`}>
                {filteredSongs.map((song, i) => (
                  <div key={song.key || `song-${i}-${song.title || 'untitled'}`} className="w-full">
                    <SongCard
                      song={song}
                      index={i}
                      handlePlayClick={handlePlayClick}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiSearch className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No songs found</h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Playlists Section (Placeholder) */}
        {(activeTab === 'all' || activeTab === 'playlists') && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <HiTrendingUp className="w-5 h-5 text-purple-400" />
              <h2 className="text-2xl font-bold">Playlists</h2>
            </div>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiList className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No playlists found</h3>
              <p className="text-gray-400">
                Playlist search coming soon!
              </p>
            </div>
          </div>        )}
      </div>
    </div>
  );
};

export default Search;