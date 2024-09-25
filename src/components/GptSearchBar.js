import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
// import openAi from "../utils/openAi";
import { API_OPTIONS } from "../utils/constant";
import { addGptMoviesResult, addGptMovieName } from "../utils/gptSlice";

const GptSearchBar = () => {
  const current_lang = useSelector((store) => store.config.lang);
  const textInput = useRef(null);
  const dispatch = useDispatch();

  const tmdbSearchMovies = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    json && dispatch(addGptMoviesResult(json));
    json && dispatch(addGptMovieName(textInput.current.value));
  };

  const handleSubmit = async () => {
    const searchInput = textInput.current.value;

    const gptSearch =
      "Act as a movie recommendation system and suggest five movies for the query: " +
      searchInput +
      ". Only provide movie names, separated by commas.";

    // const gptResult = await openAi.chat.completions.create({
    //   messages: [{ role: "user", content: gptSearch }],
    //   model: "gpt-3.5-turbo",
    // });
    // console.log(gptResult.choices);
    tmdbSearchMovies(searchInput);
  };

  return (
    <div className="absolute top-[10%] left-[40%] flex justify-center  text-white bg-gray-500 rounded ">
      <form className="" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={textInput}
          type="text"
          placeholder={lang[current_lang].gptSearchPlaceholder}
          className="w-96 bg-gray-500 pl-4 py-4"
        />
        <button
          className="p-4 px-5  bg-red-700  rounded"
          onClick={handleSubmit}
        >
          {lang[current_lang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
