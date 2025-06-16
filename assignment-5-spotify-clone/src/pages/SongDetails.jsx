import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';
import Loader from '../components/Loader';
import SongCard from '../components/SongCard';

const SongDetails = () => {
  const { songid } = useParams();
  const { data: songData, isFetching: fetchingSong } = useGetSongDetailsQuery(songid);
  const { data: relatedSongs, isFetching: fetchingRelated } = useGetSongRelatedQuery(songid);

  if (fetchingSong || fetchingRelated) return <Loader title="Loading song details..." />;

  return (
    <div className="text-white px-6 py-4 ml-60">
      <h2 className="text-3xl font-bold mb-4">{songData?.title}</h2>
      <p className="text-gray-300 text-sm mb-6">{songData?.sections[1]?.text?.join('\n')}</p>

      <h3 className="text-xl font-semibold mb-4">Related Songs</h3>
      <div className="flex flex-wrap gap-6">
        {relatedSongs?.map((song, i) => (
          <SongCard key={song.key} song={song} index={i} />
        ))}
      </div>
    </div>
  );
};

export default SongDetails;