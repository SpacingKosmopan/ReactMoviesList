import { useState } from "react";

type movie = {
  key: number;
  title: string;
  year: number;
  genre: string;
  onClick?: () => void;
};

export const MovieCard = (props: movie) => {
  const [watched, setWatched] = useState(false);

  function handleButtonClick() {
    setWatched(!watched);
    props.onClick?.();
  }

  return (
    <div className={watched ? "watched" : ""}>
      <p>
        {/* key={props.key} */}
        {props.title} - {props.year}
        &nbsp;
        {props.genre}
      </p>
      <button onClick={() => handleButtonClick()}>
        {watched ? "Obejrznięty" : "Obejrznij"}
      </button>
    </div>
  );
};
