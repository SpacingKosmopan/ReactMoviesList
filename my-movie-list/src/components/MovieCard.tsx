import { useState } from "react";

type movie = {
  key: number;
  title: string;
  year: number;
  genre: string;
};

export const MovieCard = (props: movie) => {
  const [watched, setWatched] = useState(false);

  return (
    <div className={watched ? "watched" : ""}>
      <p key={props.key}>
        {props.title} - {props.year}
        &nbsp;
        {props.genre}
      </p>
      <button onClick={() => setWatched(!watched)}>
        {watched ? "Obejrzany" : "Obejrznij"}
      </button>
    </div>
  );
};
