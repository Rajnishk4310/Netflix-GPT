import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryConatiner from "./SecondaryConatiner";
import usePopularMovie from "../hooks/usePopularMovie";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovie();
  useTopRatedMovies();
  useUpcomingMovies();

  const gptToggleState = useSelector((store) => store.gpt.gptToggleState);
  const moviesList = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!moviesList) return;
  // console.log(moviesList);

  return (
    <div className="relative">
      <Header />
      {gptToggleState ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer
            trailerId={moviesList[0].id}
            title={moviesList[0].original_title}
            overview={moviesList[0].overview}
          />
          <SecondaryConatiner />
        </>
      )}
    </div>
  );
};

export default Browse;
