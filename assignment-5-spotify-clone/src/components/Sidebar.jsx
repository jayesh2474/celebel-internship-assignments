import { NavLink } from 'react-router-dom';
import { HiHome, HiChartBar, HiUserGroup, HiGlobeAlt } from 'react-icons/hi';

const links = [
  { name: 'Discover', to: '/', icon: HiHome },
  { name: 'Top Charts', to: '/top-charts', icon: HiChartBar },
  { name: 'Top Artists', to: '/top-artists', icon: HiUserGroup },
  { name: 'Around You', to: '/around-you', icon: HiGlobeAlt },
];

const Sidebar = () => (
  <div className="w-60 h-screen bg-[#121212] text-white flex flex-col p-6 fixed">
    <div className="mb-8">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-spotifyGreen to-green-400 bg-clip-text text-transparent">
        Spotify 2.0
      </h1>
    </div>

    <nav className="space-y-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="font-medium">{link.name}</span>
          </NavLink>
        );
      })}
    </nav>

    <div className="mt-auto">
      <div className="bg-white/10 rounded-md p-4">
        <h3 className="text-sm font-medium mb-2">Install App</h3>
        <p className="text-xs text-gray-400">
          Get the best experience with our mobile app
        </p>
      </div>
    </div>
  </div>
);

export default Sidebar;