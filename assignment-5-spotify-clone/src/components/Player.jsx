import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiPlay, HiPause } from 'react-icons/hi';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { HiOutlineQueueList } from 'react-icons/hi';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const Player = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex, activeSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    if (!isActive) return;
    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));
    const nextIndex = (currentIndex + 1) % currentSongs.length;
    dispatch(setActiveSong({ song: currentSongs[nextIndex], data: currentSongs, index: nextIndex }));
    dispatch(playPause(true));
  };

  const handlePrevSong = () => {
    dispatch(playPause(false));
    const prevIndex = (currentIndex - 1 + currentSongs.length) % currentSongs.length;
    dispatch(setActiveSong({ song: currentSongs[prevIndex], data: currentSongs, index: prevIndex }));
    dispatch(playPause(true));
  };

  const handleTimeUpdate = (e) => {
    setAppTime(e.target.currentTime);
    setSeekTime(e.target.currentTime);
  };

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration);
  };

  const handleSeek = (e) => {
    setSeekTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
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

  if (!activeSong?.title) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] p-4 z-50">
      <div className="flex items-center justify-between max-w-[2000px] mx-auto">
        {/* Left section - Song info */}
        <div className="flex items-center space-x-4 w-[30%]">
          <img
            src={activeSong?.images?.coverart || activeSong?.images?.background}
            alt={activeSong?.title}
            className="w-14 h-14 rounded-md"
          />
          <div className="flex flex-col">
            <h4 className="text-white font-medium truncate">{activeSong?.title}</h4>
            <p className="text-gray-400 text-sm truncate">{activeSong?.subtitle}</p>
          </div>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isLiked ? <HiHeart className="w-5 h-5" /> : <HiOutlineHeart className="w-5 h-5" />}
          </button>
        </div>

        {/* Center section - Player controls */}
        <div className="flex flex-col items-center w-[40%]">
          <div className="flex items-center space-x-6 mb-2">
            <button 
              onClick={() => setShuffle(!shuffle)}
              className={`text-gray-400 hover:text-white transition-colors ${shuffle ? 'text-spotifyGreen' : ''}`}
            >
              <HiSwitchHorizontal className="w-5 h-5" />
            </button>
            <button 
              onClick={handlePrevSong}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>
            <button 
              onClick={handlePlayPause}
              className="bg-white text-black p-2 rounded-full hover:scale-110 transition-transform"
            >
              {isPlaying ? <HiPause className="w-6 h-6" /> : <HiPlay className="w-6 h-6" />}
            </button>
            <button 
              onClick={handleNextSong}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
            <button 
              onClick={() => setRepeat(!repeat)}
              className={`text-gray-400 hover:text-white transition-colors ${repeat ? 'text-spotifyGreen' : ''}`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <span className="text-gray-400 text-xs">{formatTime(appTime)}</span>
            <input
              type="range"
              value={seekTime}
              min="0"
              max={duration || 0}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-gray-400 text-xs">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right section - Volume and queue */}
        <div className="flex items-center justify-end space-x-4 w-[30%]">
          <button className="text-gray-400 hover:text-white transition-colors">
            <HiOutlineQueueList className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <HiOutlineDevicePhoneMobile className="w-5 h-5" />
          </button>
          <div className="relative group">
            <button 
              onClick={() => setShowVolume(!showVolume)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {volume === 0 ? <HiVolumeOff className="w-5 h-5" /> : <HiVolumeUp className="w-5 h-5" />}
            </button>
            {showVolume && (
              <div className="absolute bottom-10 right-0 bg-[#282828] p-2 rounded-md">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={activeSong?.hub?.actions?.[1]?.uri}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNextSong}
        loop={repeat}
      />
    </div>
  );
};

export default Player; 