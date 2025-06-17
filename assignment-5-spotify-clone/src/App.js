import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Sidebar, MusicPlayer, TopPlay } from "./components";
import {
  Discover,
  AroundYou,
  TopArtists,
  TopCharts,
  ArtistDetails,
  SongDetails,
  Search,
  Library,
} from "./pages";
import { HiHome, HiSearch, HiCollection, HiMenu } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const mobileNavItems = [
    { name: 'Home', to: '/', icon: HiHome },
    { name: 'Search', to: '/search/trending', icon: HiSearch },
    { name: 'Your Library', to: '/library', icon: HiCollection },
  ];

  return (
    <div className="relative bg-black min-h-screen text-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex bg-gradient-to-br from-black via-gray-900 to-black min-h-screen overflow-hidden">
        {/* Animated Background Elements - Desktop Only */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="flex w-full relative z-10">
          {/* Desktop Sidebar */}
          <Sidebar sidebarOpen={true} setSidebarOpen={setSidebarOpen} />

          {/* Desktop Content Area */}
          <div className="flex-1 flex flex-col ml-60">
            <div className="flex flex-1 overflow-hidden">
              {/* Main content */}
              <div className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent via-gray-900/10 to-black/20 scrollbar-hide pb-24">
                <div className="p-4 sm:p-6 lg:p-8 max-w-[1800px] mx-auto">
                  <Routes>
                    <Route path="/" element={<Discover />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/around-you" element={<AroundYou />} />
                    <Route path="/top-artists" element={<TopArtists />} />
                    <Route path="/top-charts" element={<TopCharts />} />
                    <Route path="/artists/:id" element={<ArtistDetails />} />
                    <Route path="/songs/:songid" element={<SongDetails />} />
                    <Route path="/search/:term" element={<Search />} />
                  </Routes>
                </div>
                <div className="h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
              </div>

              {/* Right Sidebar - Desktop Only */}
              <div className="w-80 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-black/60 backdrop-blur-sm border-l border-white/5">
                <TopPlay />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-xl border-b border-gray-800/50">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-white hover:text-green-400 transition-colors"
            >
              <HiMenu size={24} />
            </button>
            <h1 className="text-xl font-bold text-green-400">Spotify</h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="px-4 py-2">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/library" element={<Library />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:term" element={<Search />} />
            </Routes>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-gray-800/50">
          <div className="flex items-center justify-around py-2">
            {mobileNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to || 
                (item.to === '/' && location.pathname === '/') ||
                (item.name === 'Search' && location.pathname.startsWith('/search'));
              
              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={`flex flex-col items-center py-2 px-4 transition-colors ${
                    isActive ? 'text-green-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs mt-1 font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/70 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          </>
        )}
      </div>

      {/* Music Player - Both Mobile and Desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <MusicPlayer />
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default App;
