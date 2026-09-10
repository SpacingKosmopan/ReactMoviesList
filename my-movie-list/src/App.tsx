import "./App.css";
import movies from "./data/movies.json";
import { MovieCard } from "./components/MovieCard.tsx";
import { useState } from "react";

// forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating?: number;
};

function App() {
  // useState<type>(initial value)
  const [watchedList, setWatchedList] = useState<string[]>([]);
  const [moviesFilter, setMoviesFilter] = useState<boolean | null>(null);
  const [moviesList, setMoviesList] = useState<Movie[]>(movies);

  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  const [genreInput, setGenreInput] = useState<string>("");
  const [newMovieGenres, setNewMovieGenres] = useState<string[]>([]);

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

    setMoviesList((currentMovies) =>
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

  const moviesToRender =
    moviesFilter === null
      ? moviesList
      : moviesList.filter(
          (movie) => watchedList.includes(movie.title) === moviesFilter,
        );

  // * FORM * //
  const newMovieSchema = yup.object().shape({
    title: yup.string().required("Musisz podać tytuł filmu"),
    year: yup
      .number()
      .typeError("Rok musi być cyfrą")
      .integer("Rok musi być liczbą całkowitą")
      .positive("Rok nie może być ujemny")
      .required("Musisz podać rok"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newMovieSchema),
  });

  function handleNewMovieFormSubmit(data: {
    title: string;
    year: number;
    genre: string[];
  }) {
    console.log(`Adding new movie... `, data);
    if (newMovieGenres.length === 0) {
      alert("Musisz dodać co najmniej jeden gatunek");
      return;
    }
    movies.push({
      id: movies.length + 1,
      title: data.title,
      year: data.year,
      genre: newMovieGenres,
    });
    setFormVisibility(false);
    handleFormReset();
  }

  const handleFormReset = () => {
    reset();
    setNewMovieGenres([]);
    setGenreInput("");
  };

  function cancelFormHandler() {
    setFormVisibility(false);
    handleFormReset();
  }

  function addGenreToList() {
    setNewMovieGenres((current) => [...current, genreInput]);
  }

  /**
   * @param type true-watched, false-unwatched, null-all
   */
  return (
    <>
      <h1 id="site-name">
        Welcome to <span>BANANA MOVIES</span> 🍌
      </h1>
      <div id="filter-block">
        <p className="header-name">FILTER</p>
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
      <button onClick={() => setFormVisibility(true)}>dodaj nowy film</button>
      <br />

      <div id="movies-container">
        {moviesToRender.length === 0
          ? "Nie znaleziono filmów"
          : moviesToRender.map((element, key) => {
              const watched = watchedList.includes(element.title);
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
                    watched={watched}
                  />

                  <div className="banana-ratings">
                    {Array.from({ length: 5 }, (_, index) =>
                      renderBananaRatings(element, index + 1),
                    )}
                  </div>
                </div>
              );
            })}
      </div>

      {formVisibility && (
        <div className="new-movie-form-container">
          <p className="header-name">Dodaj nowy film</p>

          <form onSubmit={handleSubmit(handleNewMovieFormSubmit)}>
            <label htmlFor="title">Tytuł: </label>
            <input
              type="text"
              id="movie-title-input"
              placeholder="Tytuł..."
              {...register("title")}
            />
            {<p className="error-p">{errors.title?.message}</p>}

            <label htmlFor="year">Rok produkcji: </label>
            <input
              type="number"
              id="movie-year-input"
              placeholder="Rok produkcji..."
              {...register("year")}
            />
            {<p className="error-p">{errors.year?.message}</p>}

            <label htmlFor="genre">Gatunki: </label>

            <input
              type="text"
              id="movie-genre-input"
              placeholder="Gatunek..."
              value={genreInput}
              onInput={(e) => {
                setGenreInput(e.target.value);
              }}
            />
            <button onClick={addGenreToList} type="button">
              +
            </button>
            <div id="genres-container">
              <b>Lista gatunków:</b>
              {newMovieGenres.map((genre) => (
                <p>{genre}</p>
              ))}
            </div>
            {<p className="error-p">{errors.genre?.message}</p>}
            <hr />
            <button type="submit">Prześlij</button>
            <button onClick={cancelFormHandler}>Anuluj</button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
