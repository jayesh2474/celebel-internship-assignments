import { NavLink } from 'react-router-dom';
import { HiHome, HiChartBar, HiUserGroup, HiGlobeAlt, HiHeart, HiPlus, HiDownload } from 'react-icons/hi';
import { FiMusic, FiRadio } from 'react-icons/fi';

const links = [
  { name: 'Home', to: '/', icon: HiHome },
  { name: 'Search', to: '/search/trending', icon: 'search' },
  { name: 'Your Library', to: '/library', icon: 'library' },
];

const browseLinks = [
  { name: 'Discover', to: '/', icon: FiMusic },
  { name: 'Top Charts', to: '/top-charts', icon: HiChartBar },
  { name: 'Top Artists', to: '/top-artists', icon: HiUserGroup },
  { name: 'Around You', to: '/around-you', icon: HiGlobeAlt },
  { name: 'Radio', to: '/radio', icon: FiRadio },
];

const playlists = [
  'Liked Songs',
  'Recently Played',
  'Downloaded Music',
  'My Playlist #1',
  'Chill Vibes',
  'Workout Mix',
  'Road Trip Songs'
];

const Sidebar = () => (
  <div className="fixed left-0 top-0 h-screen w-60 bg-black flex flex-col">
    {/* Logo */}
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <div className="w-8 h-8 bg-spotifyGreen rounded-full flex items-center justify-center">
          <FiMusic className="text-black text-lg" />
        </div>
        Spotify
      </h1>
    </div>

    {/* Main Navigation */}
    <nav className="px-6 space-y-2">
      {links.map((link) => {
        const Icon = link.icon === 'search' ? 
          () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg> :
          link.icon === 'library' ?
          () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg> :
          link.icon;
        
        return (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-200 text-gray-300 hover:text-white ${
                isActive ? 'bg-gray-800 text-white' : 'hover:bg-gray-800/50'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="font-medium">{link.name}</span>
          </NavLink>
        );
      })}
    </nav>

    <div className="px-6 mt-6">
      <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
        <HiPlus className="w-5 h-5" />
        <span className="text-sm font-medium">Create Playlist</span>
      </button>
      <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mt-3">
        <HiHeart className="w-5 h-5" />
        <span className="text-sm font-medium">Liked Songs</span>
      </button>
    </div>

    {/* Browse Section */}
    <div className="px-6 mt-8">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Browse</h3>
      <nav className="space-y-1">
        {browseLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm ${
                  isActive 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{link.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>

    {/* Playlists */}
    <div className="px-6 mt-8 flex-1 overflow-y-auto">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Playlists</h3>
      <div className="space-y-1">
        {playlists.map((playlist, index) => (
          <button
            key={index}
            className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-800/50"
          >
            {playlist}
          </button>
        ))}
      </div>
    </div>

    {/* Bottom section */}
    <div className="p-6 border-t border-gray-800">
      <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
        <HiDownload className="w-4 h-4" />
        <span className="font-medium">Install App</span>
      </button>
    </div>
  </div>
);

export default Sidebar;