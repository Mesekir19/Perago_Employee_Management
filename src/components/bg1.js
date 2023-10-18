import React from 'react'

const bg1 = () => {
  return (
    <div className="relative w-full max-w-lg ">
      <div className="absolute top-48 right-1 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-48 left-96 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-48 left-28 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
  );
}

export default bg1