import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
   const storedUser = JSON.parse(localStorage.getItem("user"));
   const storedToken = localStorage.getItem("token");
   const [movies, setMovies] = useState([]);
   const [selectedMovie, setSelectedMovie] = useState(null);
   const [user, setUser] = useState(storedUser? storedUser:null);
   const [token, setToken] = useState(storedToken? storedToken:null);
   

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

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} />
                    or Sign Up
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
               <Col md={8}>
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>The List is empty!</div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className="mg-5" key={movie._id} md={3}>
                            <MovieCard 
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                    }}
                />
                </Col>
            ))}
            <button
               onClick={() => { 
                setUser(null);
                setToken(null);
                localStorage.clear();
               }}
            >Logout</button>
        </>
            )}
        </Row>
    );
};