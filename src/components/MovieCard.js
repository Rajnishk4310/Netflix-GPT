import React from "react";
import { IMG_URL } from "../utils/constant";

const MovieCard = ({ movie }) => {
  if (!movie.poster_path) return null;

  return (
    <div className="w-[11%] flex-shrink-0">
      <div className="transform transition-transform duration-300 hover:scale-110 rounded-md overflow-hidden">
        <img
          src={IMG_URL + movie.poster_path}
          alt="img"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default MovieCard;
