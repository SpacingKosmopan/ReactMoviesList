import "./App.css";
import movies from "./data/movies.json";
import { MovieCard } from "./components/MovieCard.tsx";
import { useState } from "react";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating?: number;
};

function App() {
  // useState<type>(initial value)
  const [watchedList, setWatchedList] = useState<string[]>([]);
  const [moviesFilter, setMoviesFilter] = useState<boolean | null>(null);
  const [moviesList, setMoviesList] = useState<Movie[]>(movies);

  function handleMovieWatch(element: Movie) {
    setWatchedList((currentList) =>
      currentList.includes(element.title)
        ? currentList.filter((title) => title !== element.title)
        : [...currentList, element.title],
    );
  }

  function clearMovies() {
    setMoviesList([]);
    setMoviesFilter(null);
    setWatchedList([]);
  }

  function setRating(movieTitle: string, rating: number) {
    if (rating < 0 || rating > 5) {
      console.error("Wrong rating");
      return;
    }

    setMoviesList(
      /*❌ moviesList.map((movie) =>
        movie.title === movieTitle
          ? {
              id: movie.id,
              title: movie.title,
              genre: movie.genre,
              year: movie.year,
              rating: rating,
            }
          : movie,
      ),*/

      /*(currentMovies) =>
        currentMovies.map((movie) =>
          movie.title === movieTitle ? { ...movie, rating } : movie,
        */
      (currentMovies) =>
        currentMovies.map((movie) => {
          if (movie.title === movieTitle) {
            return { ...movie, rating };
          } else return movie;
        }),
    );
  }

  function renderBananaRatings(element: Movie, index: number) {
    return (
      <svg
        key={index}
        height="50"
        viewBox="0 0 550 400"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setRating(element.title, index)}
      >
        <path
          d="
          M 78 75
          C 275 225, 315 155, 435 112
          C 474 98, 493 103, 486 119
          C 365 342, 250 255, 63 104
          C 58 92, 66 78, 78 75
          Z
        "
          stroke="black"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={
            element.rating && element.rating >= index
              ? "banana-selected"
              : "banana-not-selected"
          }
        />

        <circle cx="13%" cy="22%" r="25" />
      </svg>
    );
  }

  /**
   *
   * @param type true-watched, false-unwatched, null-all
   */
  return (
    <>
      <h1 id="site-name">
        Welcome to <span>BANANA MOVIES</span> 🍌
      </h1>

      <div id="filter-block">
        <p id="filter-name">FILTER</p>
        <div className="details-dropdown-buttons-wrapper">
          <button onClick={() => setMoviesFilter(null)}>wszystkie</button>
          <button onClick={() => setMoviesFilter(true)}>obejrzane</button>
          <button onClick={() => setMoviesFilter(false)}>nieobejrzane</button>
        </div>
      </div>

      <p>
        Obejrzane: {watchedList.length}/{moviesList.length}
      </p>
      <button onClick={() => clearMovies()}>usuń wszystkie filmy</button>
      <br />
      {moviesList.length > 0
        ? moviesList.map((element, key) => {
            if (moviesFilter !== null)
              if (moviesFilter !== watchedList.includes(element.title)) return;

            return (
              <div key={key}>
                <MovieCard
                  id={key}
                  genre={element.genre}
                  title={element.title}
                  year={element.year}
                  onClick={() => {
                    handleMovieWatch(element);
                  }}
                  rating={element?.rating || undefined}
                  watched={watchedList.includes(element.title)}
                />

                <div className="banana-ratings">
                  {Array.from({ length: 5 }, (_, index) =>
                    renderBananaRatings(element, index + 1),
                  )}
                </div>

                <hr />
              </div>
            );
          })
        : "No movies found"}
    </>
  );
}

export default App;
