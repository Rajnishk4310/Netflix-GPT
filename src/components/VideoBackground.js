import React from "react";

const VideoBackground = ({ videoKey }) => {
  return (
    <div className="w-screen ">
      <iframe
        className="w-screen h-screen aspect-ratio"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=0&mute=0&controls=0&modestbranding=1&showinfo=0&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
