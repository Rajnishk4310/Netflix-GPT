import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryConatiner from "./SecondaryConatiner";

const Browse = () => {
  useNowPlayingMovies();
  const moviesList = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!moviesList) return;
  // console.log(moviesList);
  return (
    <div className="relative">
      <Header />
      <MainContainer trailerId={moviesList[0].id} />
      <SecondaryConatiner />
    </div>
  );
};

export default Browse;
