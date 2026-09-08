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
  // useState<type>(initial value)
  const [watchedList, setWatchedList] = useState(Array<string>);
  const [moviesFilter, setMoviesFilter] = useState<boolean | null>(null);
  const [moviesList, setMoviesList] = useState(movies);

  function handleMovieWatch(element: movie) {
    if (watchedList.includes(element.title)) {
      setWatchedList(watchedList.filter((movie) => movie !== element.title));
    } else setWatchedList([...watchedList, element.title]);
  }

  function clearMovies() {
    setMoviesList([]);
    setMoviesFilter(null);
    setWatchedList([]);
  }

  /**
   *
   * @param type true-watched, false-unwatched, null-all
   */
  return (
    <>
      <p>
        Obejrzane: {watchedList.length}/{moviesList.length}
      </p>
      Filtruj: <button onClick={() => setMoviesFilter(null)}>wszystkie</button>
      <button onClick={() => setMoviesFilter(true)}>obejrzane</button>
      <button onClick={() => setMoviesFilter(false)}>nieobejrzane</button>
      {"[ <=> ]"}
      <button onClick={() => clearMovies()}>wyczyść wszystkie</button>
      {moviesList.length >= 0
        ? moviesList.map((element, key) => {
            if (moviesFilter !== null)
              if (moviesFilter !== !watchedList.includes(element.title)) return;

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
          })
        : "No movies found"}
      {/* movies list render (map)*/}
    </>
  );
}

export default App;
