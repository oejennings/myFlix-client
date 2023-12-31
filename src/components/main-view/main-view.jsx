import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { SearchForm } from "../search-form/search-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
   const storedToken = localStorage.getItem("token");
   const storedUser = JSON.parse(localStorage.getItem("user"));
   const [user, setUser] = useState(storedUser ? storedUser : null);
   const [token, setToken] = useState(storedToken ? storedToken:null);
   const [movies, setMovies] = useState([]);

   const handleSearch = (searchTerm) => {
    // Filter the movies based on the search term
    const filteredMovies = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the movies state with the filtered results
    setMovies(filteredMovies);
};

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
    <BrowserRouter>
        <NavigationBar
            user={user}
            onLoggedOut={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            }}
        />
        <Row className="justify-content-md-center">
            <Routes>
                <Route 
                    path="/signup"
                    element={
                        <>
                        {user ? (
                            <Navigate to="/" />
                        ) : (
                            <Col md={5}>
                                <SignupView />
                            </Col>
                        )}
                        </>
                    }
                />
                <Route 
                    path="/login"
                    element={
                        <>
                        {user ? (
                            <Navigate to="/" />
                        ) : (
                            <Col md={5}>
                                <LoginView 
                                    onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                }} />
                            </Col>
                        )}
                        </>
                    }
                />
                <Route 
                    path="movies/:movieId"
                    element={
                        <>
                        {!user ? (
                            <Navigate to="login" replace />
                        ) : movies.length === 0 ? (
                            <Col>The list is empty!</Col>
                        ) : (
                            <Col md={8}>
                                <MovieView movies={movies} />
                            </Col>
                        )}
                        </>
                    }
                />
                <Route
                    path="/"
                    element={
                        <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ) : movies.length === 0 ? (
                            <Col>The list is empty!</Col>
                        ) : (
                            <>
                            <Row>
                                <Col>
                                    <SearchForm onSearch={handleSearch} />
                                </Col>
                            </Row>
                            {movies.map((movie) => (
                                <Col className="mg-5" key={movie._id} md={3}>
                                    <MovieCard movie={movie} 
                                        user={user}
                                        token={token}
                                        setUser={setUser}
                                    />
                                </Col>
                            ))}
                            </>
                        )}
                        </>
                    }
                />
                <Route 
                    path="/profile"
                    element={
                        <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ) : (
                            <Col>
                                <ProfileView
                                    user={user}
                                    token={token}
                                    setUser={setUser}
                                    movies={movies}
                                />
                            </Col>
                        )}
                        </>
                    }
                />
            </Routes>
        </Row>
    </BrowserRouter>
    );
};