import React from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar, MusicPlayer, SearchBar } from "./components";
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
  <div className="relative flex bg-gradient-to-br from-gray-900 to-black min-h-screen">
    <div className="flex flex-col w-full">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md">
            <SearchBar />
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4">
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
        </div>
      </div>
      <div className="sticky bottom-0 z-20">
        <MusicPlayer />
      </div>
    </div>
  </div>
);

export default App;
