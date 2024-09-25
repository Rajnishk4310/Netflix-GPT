import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const MainContainer = ({ trailerId, title, overview }) => {
  useMovieTrailer({ trailerId });
  const trailer = useSelector((store) => store.movies.trailerKey);
  if (!trailer) return;

  return (
    <div className=" ">
      <VideoTitle title={title} para={overview} />
      <VideoBackground videoKey={trailer.key} />
    </div>
  );
};

export default MainContainer;
