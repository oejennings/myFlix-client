import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
   const [movies, setMovies] = useState ([]);

   const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://oj-movies-0c0784fe26f8.herokuapp.com/")
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.docs.map((doc) => {
                return {
                    _id: movie._id,
                    title: movie.title,
                    description: movie.description,
                    genre: {
                        name: movie.genre.name,
                        description: movie.genre.descriptioni
                    },
                    director: {
                        name: movie.director.name,
                        bio: movie.director.bio
                    },
                    image: movie.imagePath 
                };
            });
            setMovies(moviesFromApi);
        });
    }, []);
   
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