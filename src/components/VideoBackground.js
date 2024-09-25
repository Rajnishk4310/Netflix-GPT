import React from "react";

const VideoBackground = ({ videoKey }) => {
  return (
    <div className="w-screen  aspect-video hidden md:block">
      <iframe
        width="100%"
        height="100%"
        className=""
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow=" autoplay; encrypted-media; gyroscope"
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
