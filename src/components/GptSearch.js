import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptSearchResult from "./GptSearchResult";
import { BG_URL } from "../utils/constant";

const GptSearch = () => {
  return (
    <div className="fixed">
      <img
        className="brightness-50 w-full h-full object-cover"
        src={BG_URL}
        alt="background"
      />
      <GptSearchBar />
      <GptSearchResult />
    </div>
  );
};

export default GptSearch;
