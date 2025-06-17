import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSongsBySearchQuery, useGetGenresQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';

const Search = () => {
  const { term } = useParams();
  const { data, isFetching } = useGetSongsBySearchQuery(term);
  const { data: genres } = useGetGenresQuery();
  const [selectedGenre, setSelectedGenre] = React.useState('');

  if (isFetching) return <Loader title={`Searching for "${term}"...`} />;

  // Filter songs by selected genre if any
  const filteredSongs = selectedGenre
    ? data.filter(song => song.genre_id === Number(selectedGenre))
    : data;

  return (
    <div className="text-white px-6 py-4 ml-60">
      <h2 className="text-3xl font-bold mb-6">Search Results for "{term}"</h2>
      {genres && genres.length > 0 && (
        <div className="mb-4">
          <label className="mr-2 font-medium">Filter by Genre:</label>
          <select
            className="bg-[#181818] text-white px-3 py-2 rounded"
            value={selectedGenre}
            onChange={e => setSelectedGenre(e.target.value)}
          >
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
      )}
      <div className="flex flex-wrap gap-6">
        {Array.isArray(filteredSongs) && filteredSongs.length > 0 ? (
          filteredSongs.map((song, i) => (
            <SongCard key={song.key || `song-${i}-${song.title || 'untitled'}`} song={song} index={i} />
          ))
        ) : (
          <div className="text-gray-400">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default Search;