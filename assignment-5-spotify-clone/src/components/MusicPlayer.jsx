import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiPlay, HiPause, HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { HiRewind, HiFastForward } from 'react-icons/hi';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

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

  const handlePlayPause = () => {
    dispatch(playPause(!isPlaying));
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
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-gray-800 p-4 flex items-center justify-between text-white z-50">
      <div className="flex items-center space-x-4 w-1/3">
        <img 
          src={activeSong?.images?.coverart} 
          alt={activeSong?.title} 
          className="w-14 h-14 rounded-md"
        />
        <div>
          <p className="text-sm font-medium truncate">{activeSong?.title}</p>
          <p className="text-xs text-gray-400 truncate">{activeSong?.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">
            <HiRewind className="w-5 h-5" />
          </button>
          <button 
            onClick={handlePlayPause}
            className="bg-white text-black p-2 rounded-full hover:scale-110 transition-transform"
          >
            {isPlaying ? (
              <HiPause className="w-6 h-6" />
            ) : (
              <HiPlay className="w-6 h-6" />
            )}
          </button>
          <button className="text-gray-400 hover:text-white">
            <HiFastForward className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center space-x-2 w-full mt-2">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 w-1/3 justify-end">
        <button 
          onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
          className="text-gray-400 hover:text-white"
        >
          {volume === 0 ? (
            <HiVolumeOff className="w-5 h-5" />
          ) : (
            <HiVolumeUp className="w-5 h-5" />
          )}
        </button>
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

      <audio
        ref={audioRef}
        src={activeSong?.hub?.actions[1]?.uri}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => dispatch(playPause(false))}
      />
    </div>
  );
};

export default MusicPlayer;
