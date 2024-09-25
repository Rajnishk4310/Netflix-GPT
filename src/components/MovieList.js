import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ category, list }) => {
  if(!list)return null;

  return (
    <div className="mb-4 relative -top-80 z-50">
      <h1 className="text-3xl font-bold">{category}</h1>
      
      {/* Container for scrolling */}
      <div className="flex space-x-5 overflow-x-auto  scrollbar-hide">
        {list &&
          list.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default MovieList;
