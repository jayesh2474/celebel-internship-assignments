import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';
import Loader from '../components/Loader';
import SongCard from '../components/SongCard';

const ArtistDetails = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetArtistDetailsQuery(id);

  if (isFetching) return <Loader title="Loading artist details..." />;

  return (
    <div className="text-white px-6 py-4 ml-60">
      <h2 className="text-3xl font-bold mb-6">Artist Details</h2>
      <div className="flex flex-wrap gap-6">
        {data?.data[0]?.views['top-songs']?.data.map((song, i) => (
          <SongCard key={song.id} song={song} index={i} />
        ))}
      </div>
    </div>
  );
};

export default ArtistDetails;