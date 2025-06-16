import React from 'react';

const Loader = ({ title }) => (
  <div className="flex justify-center items-center w-full h-full text-white">
    <p className="text-lg animate-pulse">{title || 'Loading...'}</p>
  </div>
);

export default Loader;
