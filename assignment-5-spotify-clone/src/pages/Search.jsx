import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';

const Search = () => {
  const { term } = useParams();
  const { data, isFetching } = useGetSongsBySearchQuery(term);

  if (isFetching) return <Loader title={`Searching for "${term}"...`} />;

  return (
    <div className="text-white px-6 py-4 ml-60">
      <h2 className="text-3xl font-bold mb-6">Search Results for "{term}"</h2>
      <div className="flex flex-wrap gap-6">
        {Array.isArray(data) && data.map((song, i) => (
          <SongCard key={song.key || `song-${i}-${song.title || 'untitled'}`} song={song} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Search;