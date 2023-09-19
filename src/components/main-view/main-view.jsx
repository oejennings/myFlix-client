import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";

export const MainView = () => {
   const [movies, setMovies] = useState([]);
   const [selectedMovie, setSelectedMovie] = useState(null);
   const [user, setUser] = useState(null);
   const [token, setToken] = useState(null);
   const storedUser = JSON.parse(localStorage.getItem("user"));
   const storedToken = localStorage.getItem("token");

    useEffect(() => {
        if(!token) return;

        fetch("https://oj-movies-0c0784fe26f8.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    _id: movie._id,
                    Title: movie.Title,
                    Description: movie.Description,
                    Genre: {
                        Name: movie.Genre.Name,
                        Description: movie.Genre.Description,
                    },
                    Director: {
                        Name: movie.Director.Name,
                        Bio: movie.Director.Bio,
                    },
                    ImagePath: movie.ImagePath 
                };
            });
            setMovies(moviesFromApi);
        });
    }, [token]);

    if (!user) {
        return (
        <>
        <LoginView
            onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
            }} />
        or 
        <SignupView />
        </>
        );
    }
   
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
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
            {movies.map((movie) => (
                <MovieCard 
                    key={movie._id} 
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