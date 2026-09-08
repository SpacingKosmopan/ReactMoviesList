import "./App.css";
import movies from "./data/movies.json";
import { MovieCard } from "./components/MovieCard.tsx";
import { useState } from "react";

type movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
};

function App() {
  const [watchedList, setWatchedList] = useState(Array<string>);

  function handleMovieWatch(element: movie) {
    console.log(element);
    if (watchedList.includes(element.title)) {
      setWatchedList(watchedList.filter((movie) => movie !== element.title));
    } else setWatchedList([...watchedList, element.title]);
  }

  return (
    <>
      <p>
        Obejrzane: {watchedList.length}/{movies.length}
      </p>
      {movies.map((element, key) => {
        return (
          <MovieCard
            key={key}
            genre={element.genre}
            title={element.title}
            year={element.year}
            onClick={() => {
              handleMovieWatch(element);
            }}
          />
        );
      })}
    </>
  );
}

export default App;
