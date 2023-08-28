import { useState } from "react";

export const MainView = () => {
   const [movies, setMovies] = useState ([
    { id: 1, title: "Clue" },
    { id: 2, title: "The Avengers" },
    { id: 3, title: "Jurrasic Park"}
   ]);
   if (movies.length === 0) {
    return <div>The List is empty!</div>
   } else {
    return (
        <div>
            {movies.map((movie) => {
                return <div key={movie.id}>{movie.title}</div>
            })}
        </div>
    )
   }
  };