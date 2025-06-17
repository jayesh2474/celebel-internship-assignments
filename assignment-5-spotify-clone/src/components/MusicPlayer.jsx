import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiPlay, HiPause, HiVolumeUp, HiVolumeOff, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { FiShuffle, FiRepeat, FiSkipBack, FiSkipForward, FiList, FiMonitor, FiMaximize2 } from 'react-icons/fi';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const { activeSong, currentSongs, currentIndex, isPlaying } = useSelector((state) => state.player);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [shuffledSongs, setShuffledSongs] = useState([]);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, activeSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (shuffle && currentSongs?.length > 0) {
      const songs = [...currentSongs];
      const currentSong = songs[currentIndex];
      songs.splice(currentIndex, 1);
      for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
      }
      songs.unshift(currentSong);
      setShuffledSongs(songs);
    } else {
      setShuffledSongs([]);
    }
  }, [shuffle, currentSongs, currentIndex]);

  const handlePlayPause = () => {
    if (!activeSong?.title) return;
    dispatch(playPause(!isPlaying));
  };

  const handleNextSong = () => {
    if (!currentSongs?.length) return;

    dispatch(playPause(false));
    let nextIndex;
    let nextSong;

    if (shuffle && shuffledSongs.length > 0) {
      const currentSongIndex = shuffledSongs.findIndex(song => song?.key === activeSong?.key);
      nextIndex = (currentSongIndex + 1) % shuffledSongs.length;
      nextSong = shuffledSongs[nextIndex];
    } else {
      nextIndex = (currentIndex + 1) % currentSongs.length;
      nextSong = currentSongs[nextIndex];
    }

    if (nextSong) {
      dispatch(setActiveSong({ 
        song: nextSong, 
        data: shuffle ? shuffledSongs : currentSongs, 
        index: nextIndex 
      }));
      dispatch(playPause(true));
    }
  };

  const handlePrevSong = () => {
    if (!currentSongs?.length) return;

    dispatch(playPause(false));
    let prevIndex;
    let prevSong;

    if (shuffle && shuffledSongs.length > 0) {
      const currentSongIndex = shuffledSongs.findIndex(song => song?.key === activeSong?.key);
      prevIndex = (currentSongIndex - 1 + shuffledSongs.length) % shuffledSongs.length;
      prevSong = shuffledSongs[prevIndex];
    } else {
      prevIndex = (currentIndex - 1 + currentSongs.length) % currentSongs.length;
      prevSong = currentSongs[prevIndex];
    }

    if (prevSong) {
      dispatch(setActiveSong({ 
        song: prevSong, 
        data: shuffle ? shuffledSongs : currentSongs, 
        index: prevIndex 
      }));
      dispatch(playPause(true));
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
    setAudioError(false);
  };

  const handleAudioError = () => {
    console.error('Audio failed to load:', activeSong?.preview);
    setAudioError(true);
  };

  const handleCanPlay = () => {
    setAudioError(false);
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '0:00';
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShuffle = () => {
    setShuffle(!shuffle);
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  if (!activeSong?.title) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-gray-900/95 to-gray-900/90 backdrop-blur-xl border-t border-white/10 z-50">
      {/* Progress Bar at Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700/50">
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300 shadow-lg shadow-green-500/20"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        <input
          type="range"
          value={currentTime}
          min="0"
          max={duration || 0}
          onChange={handleSeek}
          className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left - Song Info */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <img
              src={activeSong?.images?.coverart || activeSong?.images?.background || activeSong?.album?.cover_medium || '/api/placeholder/48/48'}
              alt={activeSong?.title}
              className="w-12 h-12 rounded-lg shadow-lg"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <h4 className="text-white font-medium truncate text-sm">
                {activeSong?.title}
              </h4>
              <p className="text-gray-400 text-xs truncate">
                {activeSong?.subtitle || activeSong?.artist?.name || 'Unknown Artist'}
              </p>
            </div>
          </div>

          {/* Right - Controls */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleLike}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isLiked ? (
                <HiHeart className="w-5 h-5 text-red-500" />
              ) : (
                <HiOutlineHeart className="w-5 h-5" />
              )}
            </button>
            
            <button
              onClick={handlePrevSong}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <FiSkipBack className="w-5 h-5" />
            </button>
            
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-full bg-white text-black hover:scale-105 transition-all duration-200 mx-1"
            >
              {isPlaying ? (
                <HiPause className="w-6 h-6" />
              ) : (
                <HiPlay className="w-6 h-6 ml-0.5" />
              )}
            </button>
            
            <button
              onClick={handleNextSong}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <FiSkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between px-6 py-4">
        {/* Left Section - Song Info with Enhanced Design */}
        <div className="flex items-center space-x-4 w-[30%] min-w-[200px]">
          <div className="relative group">
            <img
              src={activeSong?.images?.coverart || activeSong?.images?.background || activeSong?.album?.cover_medium || '/api/placeholder/56/56'}
              alt={activeSong?.title}
              className="w-14 h-14 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <FiMaximize2 className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="flex flex-col min-w-0 flex-1">
            <h4 className="text-white font-semibold truncate hover:text-green-400 cursor-pointer transition-colors duration-300">
              {activeSong?.title}
            </h4>
            <p className="text-gray-400 text-sm truncate hover:text-gray-300 cursor-pointer transition-colors duration-300">
              {activeSong?.subtitle || activeSong?.artist?.name || 'Unknown Artist'}
            </p>
          </div>
          
          <button 
            onClick={handleLike}
            className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110"
          >
            {isLiked ? (
              <HiHeart className="w-5 h-5 text-red-500" />
            ) : (
              <HiOutlineHeart className="w-5 h-5 text-gray-400 hover:text-red-400" />
            )}
          </button>
        </div>

        {/* Center Section - Enhanced Player Controls */}
        <div className="flex flex-col items-center w-[40%] max-w-[600px]">
          <div className="flex items-center space-x-6 mb-3">
            <button 
              onClick={handleShuffle}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                shuffle 
                  ? 'text-green-400 bg-green-400/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              title="Shuffle"
            >
              <FiShuffle className="w-4 h-4" />
            </button>
            
            <button 
              onClick={handlePrevSong}
              className="p-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-full"
              title="Previous"
            >
              <FiSkipBack className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handlePlayPause}
              className="bg-white hover:bg-gray-200 text-black p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-white/25"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <HiPause className="w-6 h-6" />
              ) : (
                <HiPlay className="w-6 h-6 ml-0.5" />
              )}
            </button>
            
            <button 
              onClick={handleNextSong}
              className="p-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-full"
              title="Next"
            >
              <FiSkipForward className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleRepeat}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                repeat 
                  ? 'text-green-400 bg-green-400/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              title="Repeat"
            >
              <FiRepeat className="w-4 h-4" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-3 w-full">
            <span className="text-gray-400 text-xs font-mono min-w-[35px]">
              {formatTime(currentTime)}
            </span>
            <div className="relative flex-1 h-2 bg-gray-700/50 rounded-full group">
              <div 
                className="absolute h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-300 shadow-lg shadow-green-500/20"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <div 
                className="absolute w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-0.5"
                style={{ left: `${(currentTime / duration) * 100}%`, marginLeft: '-6px' }}
              />
              <input
                type="range"
                value={currentTime}
                min="0"
                max={duration || 0}
                onChange={handleSeek}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-gray-400 text-xs font-mono min-w-[35px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right Section - Enhanced Controls */}
        <div className="flex items-center justify-end space-x-2 w-[30%] min-w-[200px]">
          <button 
            className="p-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-full"
            title="Queue"
          >
            <FiList className="w-4 h-4" />
          </button>
          
          <button 
            className="p-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-full"
            title="Connect to device"
          >
            <FiMonitor className="w-4 h-4" />
          </button>
          
          {/* Enhanced Volume Control */}
          <div className="relative group">
            <button 
              onMouseEnter={() => setShowVolume(true)}
              onMouseLeave={() => setShowVolume(false)}
              className="p-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-full"
              title={`Volume ${Math.round(volume * 100)}%`}
            >
              {volume === 0 ? (
                <HiVolumeOff className="w-4 h-4" />
              ) : (
                <HiVolumeUp className="w-4 h-4" />
              )}
            </button>
            
            {showVolume && (
              <div className="absolute bottom-12 right-0 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-2xl">
                <div className="flex items-center space-x-3">
                  <HiVolumeOff className="w-4 h-4 text-gray-400" />
                  <div className="relative w-24 h-2 bg-gray-700 rounded-full">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                      style={{ width: `${volume * 100}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <HiVolumeUp className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-center mt-2 text-xs text-gray-400">
                  {Math.round(volume * 100)}%
                </div>
              </div>            )}
          </div>
        </div>
      </div>      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={activeSong?.preview}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNextSong}
        onError={handleAudioError}
        onCanPlay={handleCanPlay}
        loop={repeat}
        preload="metadata"
        crossOrigin="anonymous"
      />
      
      {/* Debug info for development */}
      {process.env.NODE_ENV === 'development' && audioError && (
        <div className="absolute top-0 left-0 bg-red-500 text-white p-2 text-xs z-50">
          Audio Error: {activeSong?.preview || 'No preview URL'}
        </div>
      )}
      
      {/* Fallback message when no audio is available */}
      {audioError && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-yellow-600/90 text-white px-4 py-2 rounded-b-lg text-sm z-40">
          Audio preview not available for this track
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
