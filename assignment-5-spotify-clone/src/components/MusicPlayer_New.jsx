import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiPlay, HiPause, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { FiSkipBack, FiSkipForward } from 'react-icons/fi';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const { activeSong, currentSongs, currentIndex, isPlaying } = useSelector((state) => state.player);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, activeSong]);

  const handlePlayPause = () => {
    if (!activeSong) return;
    dispatch(playPause(!isPlaying));
  };

  const handleNextSong = () => {
    if (!currentSongs || currentSongs.length === 0) return;
    const nextIndex = (currentIndex + 1) % currentSongs.length;
    const nextSong = currentSongs[nextIndex];
    if (nextSong) {
      dispatch(setActiveSong({ song: nextSong, data: currentSongs, index: nextIndex }));
      dispatch(playPause(true));
    }
  };

  const handlePrevSong = () => {
    if (!currentSongs || currentSongs.length === 0) return;
    const prevIndex = (currentIndex - 1 + currentSongs.length) % currentSongs.length;
    const prevSong = currentSongs[prevIndex];
    if (prevSong) {
      dispatch(setActiveSong({ song: prevSong, data: currentSongs, index: prevIndex }));
      dispatch(playPause(true));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const seekTime = percent * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (!activeSong?.title) return null;

  return (
    <>
      {/* Mobile Player */}
      <div className="lg:hidden bg-gradient-to-t from-gray-900 to-black/95 backdrop-blur-xl border-t border-gray-700/50">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-600/50 cursor-pointer" onClick={handleSeek}>
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Mobile Player Content */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Song Info */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <img
              src={activeSong?.images?.coverart || activeSong?.images?.background || '/api/placeholder/48/48'}
              alt={activeSong?.title}
              className="w-12 h-12 rounded-lg"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <h4 className="text-white font-medium truncate text-sm">
                {activeSong?.title}
              </h4>
              <p className="text-gray-400 text-xs truncate">
                {activeSong?.subtitle || 'Unknown Artist'}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 text-gray-400 hover:text-white"
            >
              {isLiked ? (
                <HiHeart className="w-5 h-5 text-red-500" />
              ) : (
                <HiOutlineHeart className="w-5 h-5" />
              )}
            </button>
            
            <button
              onClick={handlePrevSong}
              className="p-1 text-gray-400 hover:text-white"
            >
              <FiSkipBack className="w-5 h-5" />
            </button>
            
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-full bg-white text-black hover:scale-105 transition-all duration-200"
            >
              {isPlaying ? (
                <HiPause className="w-6 h-6" />
              ) : (
                <HiPlay className="w-6 h-6 ml-0.5" />
              )}
            </button>
            
            <button
              onClick={handleNextSong}
              className="p-1 text-gray-400 hover:text-white"
            >
              <FiSkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Player */}
      <div className="hidden lg:flex bg-gradient-to-t from-black via-gray-900/95 to-gray-900/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 items-center justify-between">
        {/* Left - Song Info */}
        <div className="flex items-center space-x-4 w-1/3 min-w-0">
          <img
            src={activeSong?.images?.coverart || activeSong?.images?.background || '/api/placeholder/56/56'}
            alt={activeSong?.title}
            className="w-14 h-14 rounded-lg shadow-lg"
          />
          <div className="flex flex-col min-w-0 flex-1">
            <h4 className="text-white font-semibold truncate">
              {activeSong?.title}
            </h4>
            <p className="text-gray-400 text-sm truncate">
              {activeSong?.subtitle || 'Unknown Artist'}
            </p>
          </div>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            {isLiked ? (
              <HiHeart className="w-5 h-5 text-red-500" />
            ) : (
              <HiOutlineHeart className="w-5 h-5 text-gray-400 hover:text-red-400" />
            )}
          </button>
        </div>

        {/* Center - Player Controls */}
        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-center space-x-4 mb-3">
            <button 
              onClick={handlePrevSong}
              className="p-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <FiSkipBack className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handlePlayPause}
              className="bg-white hover:bg-gray-200 text-black p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              {isPlaying ? (
                <HiPause className="w-6 h-6" />
              ) : (
                <HiPlay className="w-6 h-6 ml-0.5" />
              )}
            </button>
            
            <button 
              onClick={handleNextSong}
              className="p-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <FiSkipForward className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-3 w-full max-w-md">
            <span className="text-gray-400 text-xs font-mono min-w-[35px]">
              {formatTime(currentTime)}
            </span>
            <div className="relative flex-1 h-2 bg-gray-700/50 rounded-full cursor-pointer" onClick={handleSeek}>
              <div 
                className="absolute h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-gray-400 text-xs font-mono min-w-[35px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right - Empty space for now */}
        <div className="w-1/3"></div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={activeSong?.preview}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNextSong}
        preload="metadata"
      />
    </>
  );
};

export default MusicPlayer;
