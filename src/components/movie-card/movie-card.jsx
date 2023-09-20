import React from "react";
import {useState} from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, setUser }) => {
    const [isFavorite, setIsFavorite] = useState(
        user.FavoriteMovies.includes(movie._id)
    );

    const addFavoriteMovie = () => {
        fetch (`https://oj-movies-0c0784fe26f8.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {
            method: "POST",
            headers: {Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert('Failed');
                return false;
            }
        })
        .then((user) => {
            if (user) {
                alert("Added to Favorites");
                localStorage.setItem("user", JSON.stringify(user));
                setUser(user);
                setIsFavorite(true);
            }
        })
        .catch((e) => {
            alert(e);
        });
    };

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                    <Button variant="primary">Details</Button>
                </Link>
            </Card.Body>
            <Card.Body>
                {isFavorite ? (
                    <Button variant="primary" onClick={removeFavoriteMovie}>
                        Remove From Favorites
                    </Button>
                ) : (
                    <Button variant="primary" onClick={addFavoriteMovie}>
                        Add to Favorites
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }).isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
        }).isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
};