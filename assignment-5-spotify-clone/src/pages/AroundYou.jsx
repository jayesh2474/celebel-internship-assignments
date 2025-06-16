import React from 'react';
import { useSelector } from 'react-redux';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import SongCard from '../components/SongCard';
import Loader from '../components/Loader';

const AroundYou = () => {
  const country = 'IN'; // You can make this dynamic with geolocation
  const { data, isFetching } = useGetSongsByCountryQuery(country);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading songs around you..." />;

  return (
    <div className="flex flex-col text-white px-6 py-4 ml-60">
      <h2 className="text-3xl font-bold mb-6">Around You - {country}</h2>
      <div className="flex flex-wrap gap-6">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;

