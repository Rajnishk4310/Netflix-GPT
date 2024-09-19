import React from "react";

const VideoTitle = ({ title, para }) => {
  return (
    <div className="absolute w-screen h-screen py-72  text-white p-8  bg-gradient-to-r from-transparent via-black/70 to-transparent  ">
      <div className="mb-6">
        <h1 className="text-6xl font-bold mb-4 text-shadow-lg">{title}</h1>
        <p className="w-2/3 text-lg leading-relaxed text-gray-300 drop-shadow-md">
          {para}
        </p>
      </div>

      <div className="flex space-x-6">
        <button className="p-2 px-6 bg-white bg-opacity-80 text-black rounded text-lg font-semibold flex items-center shadow-xl hover:shadow-2xl">
          ▷ Play
        </button>
        <button className="p-2 px-6 transp bg-gray-600 bg-opacity-80 hover:bg-gray-700 transition duration-300 ease-in-out rounded text-lg font-semibold shadow-xl hover:shadow-2xl">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
