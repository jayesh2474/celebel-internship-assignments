import React from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar, MusicPlayer, TopPlay } from "./components";
import {
  Discover,
  AroundYou,
  TopArtists,
  TopCharts,
  ArtistDetails,
  SongDetails,
  Search,
} from "./pages";

const App = () => (
  <div className="relative flex bg-gradient-to-br from-black via-gray-900 to-black min-h-screen text-white overflow-hidden">
    {/* Animated Background Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>

    <div className="flex w-full relative z-10">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-60">
        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent via-gray-900/10 to-black/20 scrollbar-hide">
            <div className="p-8 max-w-[1800px] mx-auto">
              <Routes>
                <Route path="/" element={<Discover />} />
                <Route path="/around-you" element={<AroundYou />} />
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-charts" element={<TopCharts />} />
                <Route path="/artists/:id" element={<ArtistDetails />} />
                <Route path="/songs/:songid" element={<SongDetails />} />
                <Route path="/search/:term" element={<Search />} />
              </Routes>
            </div>

            {/* Gradient Overlay at Bottom */}
            <div className="h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
          </div>

          {/* Right Sidebar - Top Play */}
          <div className="w-80 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-black/60 backdrop-blur-sm border-l border-white/5">
            <TopPlay />
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Music Player */}
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

export default App;
