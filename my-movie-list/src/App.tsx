import "./App.css";
import movies from "./data/movies.json";

function App() {
  return (
    <>
      {movies.map((element, key) => {
        return (
          <p key={key}>
            {element.title} - {element.year}
            &nbsp;
            {element.genre}
          </p>
        );
      })}
    </>
  );
}

export default App;
