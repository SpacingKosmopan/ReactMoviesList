import "./App.css";
import movies from "./data/movies.json";
import { MovieCard } from "./components/MovieCard.tsx";

function App() {
  return (
    <>
      {movies.map((element, key) => {
        return (
          <MovieCard
            key={key}
            genre={element.genre}
            title={element.title}
            year={element.year}
          />
        );
      })}
    </>
  );
}

export default App;
