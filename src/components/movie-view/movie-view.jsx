import { useParams } from "react-router";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import './movie-view.scss';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((movie) => movie._id === movieId)
    // const [isFavorite, setIsFavorite] = useState(false);

    // useEffect(() => {
    //     console.log(user);    
    //     if(user.FavoriteMovies && user.FavoriteMovies.includes(movie._id) ) {
    //         setIsFavorite(true);
    //     };
    // }, []);

    // addToFavorite = () => {
    //     fetch(`https://oj-movies-0c0784fe26f8.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer $(token)`,
    //         }
    //     }).then((response) => {
    //         if(response.ok){
    //             return response.json();
    //         }
    //     }).then((res) => {
    //         setIsFavorite(false);
    //         setUser(res);
    //         localStorage.setItem("userObject", JSON.stringify(res));
    //         alert("Movie is added");
    //     })
    // }

    return (
        <div>
            <div>
                <img src={movie.ImagePath}/>
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Genre Description: </span>
                <span>{movie.Genre.Description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Director Bio: </span>
                <span>{movie.Director.Bio}</span>
            </div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};