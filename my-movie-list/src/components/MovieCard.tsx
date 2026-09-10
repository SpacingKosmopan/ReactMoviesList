import { useState } from "react";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string[];
  onClick?: () => void;
  rating?: number;
  watched: boolean;
};

export const MovieCard = (props: Movie) => {
  const [watched, setWatched] = useState(false);

  function handleButtonClick() {
    setWatched(!watched);
    props.onClick?.();
  }

  return (
    <div className={watched || props.watched ? "watched" : ""}>
      <h3>
        {props.title} - {props.year}r.
      </h3>
      <p>
        Gatunek: <b>{props.genre.join(", ")}</b>
      </p>
      <button
        onClick={() => handleButtonClick()}
        className={watched || props.watched ? "watched-movie-btn" : ""}
        title="Cancel"
      >
        {watched || props.watched ? "Obejrznięty" : "🎥 Obejrznij"}
      </button>
      {
        <p>
          Ocena:{" "}
          {props.rating
            ? props.rating +
              (props.rating === 1
                ? " banan"
                : props.rating < 5
                  ? " banany"
                  : " bananów")
            : "brak"}
        </p>
      }
    </div>
  );
};
