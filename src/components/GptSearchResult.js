import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptSearchResult = () => {
  const gptResult=useSelector(store=>store.gpt);
  if(!gptResult.gptMoviesResult)return null;
  return (
    <div className="bg-black text-white p-7 -mt-80">
      <MovieList category={gptResult.gptMovieName} list={gptResult.gptMoviesResult.results} />
    </div>
  )
}

export default GptSearchResult