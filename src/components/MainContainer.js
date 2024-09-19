import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const MainContainer = ({ trailerId }) => {
  useMovieTrailer({ trailerId });
  const trailer = useSelector((store) => store.movies.trailerKey);
  if (!trailer) return;

  return (
    <div className=" w-full h-screen">
      <VideoTitle
        title={trailer.name}
        para={
          "Season 2 | Official Trailer | 21st Sept, Saturdays 8pm | Netflix"
        }
      />
      <VideoBackground videoKey={trailer.key} />
    </div>
  );
};

export default MainContainer;
