import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiHeart, HiClock, HiPlay } from 'react-icons/hi';
import { FiMusic, FiMic, FiUsers } from 'react-icons/fi';

const Library = () => {
  const navigate = useNavigate();

  const libraryCategories = [
    {
      title: 'Popular Songs',
      description: 'Trending tracks everyone is listening to',
      icon: HiHeart,
      color: 'from-red-500 to-pink-600',
      action: () => navigate('/search/popular%20hits'),
      tracks: '50+ songs'
    },
    {
      title: 'Recently Played',
      description: 'Your recent listening history',
      icon: HiClock,
      color: 'from-blue-500 to-purple-600',
      action: () => navigate('/search/recent%20hits'),
      tracks: 'Last 30 songs'
    },
    {
      title: 'Top Artists',
      description: 'Most popular artists right now',
      icon: FiMic,
      color: 'from-green-500 to-emerald-600',
      action: () => navigate('/top-artists'),
      tracks: '25+ artists'
    },
    {
      title: 'Discover New Music',
      description: 'Fresh tracks and emerging artists',
      icon: FiMusic,
      color: 'from-yellow-500 to-orange-600',
      action: () => navigate('/'),
      tracks: '100+ songs'
    }
  ];  return (
    <div className="text-white px-3 sm:px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mb-2 sm:mb-0">
            <FiUsers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Your Music Library
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Your personal music collection and recommendations
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 p-6 rounded-2xl border border-green-500/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-green-400 font-semibold">Total Tracks</h3>
            <FiMusic className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">200+</p>
          <p className="text-sm text-gray-400">Available to stream</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/10 p-6 rounded-2xl border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-blue-400 font-semibold">Artists</h3>
            <FiMic className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">50+</p>
          <p className="text-sm text-gray-400">Top performers</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500/20 to-pink-500/10 p-6 rounded-2xl border border-red-500/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-red-400 font-semibold">Listening Time</h3>
            <HiClock className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-2xl font-bold text-white">12h+</p>
          <p className="text-sm text-gray-400">This week</p>
        </div>
      </div>

      {/* Library Categories */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
          Browse Your Music
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {libraryCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                onClick={category.action}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/5 p-6 rounded-2xl border border-white/10 cursor-pointer transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-2 bg-white/10 rounded-full transition-all duration-300 hover:scale-110">
                      <HiPlay className="w-5 h-5 text-white ml-0.5" />
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{category.tracks}</span>
                    <span className="text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
          Quick Access
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          {[
            { name: 'Top Charts', path: '/top-charts', color: 'from-yellow-500 to-orange-600' },
            { name: 'New Releases', path: '/search/new%20music', color: 'from-green-500 to-emerald-600' },
            { name: 'Popular Artists', path: '/top-artists', color: 'from-blue-500 to-purple-600' },
            { name: 'Trending Now', path: '/search/trending', color: 'from-red-500 to-pink-600' }
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`group p-4 bg-gradient-to-br ${item.color} rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              <div className="flex items-center justify-between text-white">
                <span className="font-semibold">{item.name}</span>
                <HiPlay className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
