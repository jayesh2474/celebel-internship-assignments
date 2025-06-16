import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/search/${searchTerm}`);
  };

  return (
    <div className="w-full px-6 py-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-white/10 text-white px-12 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-spotifyGreen placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

