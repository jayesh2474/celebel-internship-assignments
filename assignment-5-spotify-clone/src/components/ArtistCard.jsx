import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center bg-[#1e1e1e] p-4 rounded-lg cursor-pointer hover:bg-[#282828]"
      onClick={() => navigate(`/artists/${artist?.adamid}`)}
    >
      <img
        src={artist?.images?.background}
        alt="artist"
        className="w-32 h-32 rounded-full object-cover"
      />
      <p className="text-white text-sm font-medium mt-2 truncate">{artist.name}</p>
    </div>
  );
};

export default ArtistCard;