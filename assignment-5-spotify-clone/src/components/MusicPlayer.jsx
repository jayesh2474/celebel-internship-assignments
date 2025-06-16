import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiPlay, HiPause } from 'react-icons/hi';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { HiViewList } from 'react-icons/hi';
import { HiDeviceMobile } from 'react-icons/hi';
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

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, activeSong]);

  useEffect(() => {
    audioRef.current.volume = volume;
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
    // Here you can add functionality to save liked songs
  };

  const handleShuffle = () => {
    setShuffle(!shuffle);
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
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
            onClick={handleLike}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isLiked ? <HiHeart className="w-5 h-5 text-spotifyGreen" /> : <HiOutlineHeart className="w-5 h-5" />}
          </button>
        </div>

        {/* Center section - Player controls */}
        <div className="flex flex-col items-center w-[40%]">
          <div className="flex items-center space-x-6 mb-2">
            <button 
              onClick={handleShuffle}
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
              onClick={handleRepeat}
              className={`text-gray-400 hover:text-white transition-colors ${repeat ? 'text-spotifyGreen' : ''}`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <span className="text-gray-400 text-xs">{formatTime(currentTime)}</span>
            <div className="relative w-full h-1 bg-gray-600 rounded-full">
              <div 
                className="absolute h-full bg-spotifyGreen rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
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
            <span className="text-gray-400 text-xs">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right section - Volume and queue */}
        <div className="flex items-center justify-end space-x-4 w-[30%]">
          <button className="text-gray-400 hover:text-white transition-colors">
            <HiViewList className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <HiDeviceMobile className="w-5 h-5" />
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
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
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

export default MusicPlayer;
