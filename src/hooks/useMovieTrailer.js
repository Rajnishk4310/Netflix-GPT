import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addTrailerKey } from "../utils/moviesSlice";

const useMovieTrailer = ({ trailerId }) => {
  const dispatch = useDispatch();
  const getTrailerApi = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${trailerId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    const filteredData = json.results.filter((clip) => clip.type === "Trailer");

    dispatch(
      addTrailerKey(filteredData.length ? filteredData[0] : json.results[0])
    );
  };
  useEffect(() => {
    getTrailerApi();
  });
};

export default useMovieTrailer;
