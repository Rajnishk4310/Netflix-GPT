import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryConatiner = () => {
  const movies = useSelector((store) => store.movies);
  if (!movies) return;
  // console.log(movies);
  return (
    <div className="bg-black text-white p-7">
      <MovieList category={"Now Playing"} list={movies?.nowPlayingMovies} />
      <MovieList category={"Popular"} list={movies?.popularMovies} />
      <MovieList category={"Top rated"} list={movies?.topRatedMoviesMovies} />
      <MovieList category={"Upcoming"} list={movies?.upcomingMovies} />
    </div>
  );
};

export default SecondaryConatiner;
