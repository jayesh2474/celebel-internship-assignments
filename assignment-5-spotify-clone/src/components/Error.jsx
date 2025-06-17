import React from 'react';

const Error = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-white px-4 py-8">
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-red-400 mb-2">Error</h3>
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  );
};

export default Error; 