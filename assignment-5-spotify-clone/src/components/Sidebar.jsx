import { NavLink, useNavigate } from 'react-router-dom';
import { HiHome, HiChartBar, HiUserGroup, HiGlobeAlt, HiHeart, HiSearch, HiCollection } from 'react-icons/hi';
import { FiMusic, FiTrendingUp } from 'react-icons/fi';

const links = [
  { name: 'Home', to: '/', icon: HiHome },
  { name: 'Search', to: '/search/trending', icon: HiSearch },
  { name: 'Your Library', to: '/library', icon: HiCollection },
];

const browseLinks = [
  { name: 'Discover', to: '/', icon: FiMusic },
  { name: 'Top Charts', to: '/top-charts', icon: HiChartBar },
  { name: 'Top Artists', to: '/top-artists', icon: HiUserGroup },
  { name: 'Around You', to: '/around-you', icon: HiGlobeAlt },
  { name: 'Trending', to: '/search/trending%20music', icon: FiTrendingUp },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLikedSongs = () => {
    // Navigate to search with a query that might show popular songs
    navigate('/search/popular%20hits');
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-60 bg-gradient-to-b from-black to-gray-900 flex flex-col border-r border-white/5">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <FiMusic className="text-black text-lg" />
          </div>
          Spotify
        </h1>
      </div>

      {/* Main Navigation */}
      <nav className="px-6 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          
          return (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:text-white group ${
                  isActive 
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/10 text-green-400 border border-green-500/30' 
                    : 'hover:bg-white/5 hover:bg-gradient-to-r hover:from-green-500/5 hover:to-emerald-500/5'
                }`
              }
            >
              <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Quick Access */}
      <div className="px-6 mt-6">
        <button 
          onClick={handleLikedSongs}
          className="flex items-center gap-3 w-full text-gray-400 hover:text-red-400 transition-all duration-300 p-3 rounded-xl hover:bg-red-500/10 group"
        >
          <HiHeart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm font-medium">Popular Songs</span>
        </button>
      </div>

      {/* Browse Section */}
      <div className="px-6 mt-8">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="w-4 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
          Browse Music
        </h3>
        <nav className="space-y-1">
          {browseLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 text-sm group ${
                    isActive 
                      ? 'bg-gradient-to-r from-green-500/15 to-emerald-500/5 text-green-400 border-l-2 border-green-400' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{link.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Music Categories */}
      <div className="px-6 mt-8 flex-1 overflow-y-auto">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="w-4 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
          Genres
        </h3>
        <div className="space-y-1">
          {[
            'Pop Music',
            'Hip-Hop',
            'Rock',
            'Electronic',
            'R&B',
            'Jazz',
            'Classical'
          ].map((genre, index) => (
            <button
              key={index}
              onClick={() => navigate(`/search/${encodeURIComponent(genre.toLowerCase())}`)}
              className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/5 group"
            >
              <span className="group-hover:ml-1 transition-all duration-300">{genre}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom section with enhanced design */}
      <div className="p-6 border-t border-white/10">
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-xl border border-green-500/20">
          <h4 className="text-white font-semibold text-sm mb-1">Premium Features</h4>
          <p className="text-gray-400 text-xs mb-3">Enjoy ad-free music with better quality</p>
          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-black font-semibold py-2 px-4 rounded-lg text-sm hover:from-green-400 hover:to-emerald-500 transition-all duration-300 hover:scale-105">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;