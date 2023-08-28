import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
   const [movies, setMovies] = useState ([
    {
        id: 1,
        title: "Clue",
        image: "https://m.media-amazon.com/images/I/913DShsadYL._AC_UF894,1000_QL80_.jpg",
        description: "Six guests are anonymously invited to a strange mansion for dinner, but after their host is killed, they must cooperate with the staff to identify the murderer as the bodies pile up.",
        genre: "Mystery",
        director: "Jonathan Lynn"
    },
    {
        id: 2,
        title: "The Avengers",
        image: "https://www.imdb.com/title/tt0848228/mediaviewer/rm3955117056/?ref_=tt_ov_i",
        description: "Earths mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        genre: "Action",
        director: "Joss Whedon"
    },
    {
        id: 3,
        title: "Jurrasic Park",
        image: "https://www.imdb.com/title/tt0107290/mediaviewer/rm3913805824/?ref_=tt_ov_i",
        description: "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
        genre: "Action",
        director: "Steven Spielberg"
    }
   ]);

   const [selectedMovie, setSelectedMovie] = useState(null);
   
   if (selectedMovie) {
    return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
   }

   if (movies.length === 0) {
    return <div>The List is empty!</div>
   } else {
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
   }
  };